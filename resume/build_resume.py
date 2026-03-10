#!/usr/bin/env python3
"""Build resume from vault.yaml and markdown frontmatter using Jinja2 + LaTeX."""

import argparse
import glob
import os
import subprocess
import sys

import frontmatter
import jinja2
import yaml

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.join(SCRIPT_DIR, "..", "data")
VAULT_PATH = os.path.join(DATA_DIR, "vault.yaml")
TEMPLATE_PATH = os.path.join(SCRIPT_DIR, "template.tex.j2")
OUTPUT_TEX = os.path.join(SCRIPT_DIR, "resume.tex")
OUTPUT_PDF = os.path.join(SCRIPT_DIR, "resume.pdf")


def load_vault():
    with open(VAULT_PATH, "r") as f:
        return yaml.safe_load(f)


def load_markdown_frontmatter(directory):
    """Load frontmatter from all .md files in a directory."""
    entries = []
    pattern = os.path.join(DATA_DIR, directory, "*.md")
    for filepath in sorted(glob.glob(pattern)):
        post = frontmatter.load(filepath)
        entries.append(dict(post.metadata))
    return entries


def tex_escape(text):
    """Escape special LaTeX characters."""
    if not isinstance(text, str):
        return text
    replacements = {
        "&": r"\&",
        "%": r"\%",
        "$": r"\$",
        "#": r"\#",
        "_": r"\_",
        "{": r"\{",
        "}": r"\}",
        "~": r"\textasciitilde{}",
        "^": r"\textasciicircum{}",
    }
    for char, replacement in replacements.items():
        text = text.replace(char, replacement)
    return text


def build():
    parser = argparse.ArgumentParser(description="Build resume from vault data")
    parser.add_argument(
        "--compile", action="store_true", help="Compile .tex to PDF with xelatex"
    )
    parser.add_argument(
        "--render-only",
        action="store_true",
        help="Only render .tex file (for CI)",
    )
    args = parser.parse_args()

    # Load data
    vault = load_vault()
    projects = load_markdown_frontmatter("projects")
    publications = load_markdown_frontmatter("publications")

    # Set up Jinja2 with custom delimiters to avoid LaTeX conflicts
    env = jinja2.Environment(
        loader=jinja2.FileSystemLoader(SCRIPT_DIR),
        block_start_string=r"\BLOCK{",
        block_end_string="}",
        variable_start_string=r"\VAR{",
        variable_end_string="}",
        comment_start_string=r"\#{",
        comment_end_string="}",
        autoescape=False,
    )
    env.filters["tex"] = tex_escape

    template = env.get_template("template.tex.j2")
    rendered = template.render(
        meta=vault["meta"],
        education=vault["education"],
        experience=vault["experience"],
        skills=vault["skills"],
        projects=projects,
        publications=publications,
        patents=vault.get("patents", []),
        entrepreneurship=vault.get("entrepreneurship", []),
        awards=vault.get("awards", []),
    )

    with open(OUTPUT_TEX, "w") as f:
        f.write(rendered)

    print(f"Rendered: {OUTPUT_TEX}")

    if args.render_only:
        return

    if args.compile:
        print("Compiling with xelatex...")
        result = subprocess.run(
            ["xelatex", "-interaction=nonstopmode", "-output-directory", SCRIPT_DIR, OUTPUT_TEX],
            cwd=SCRIPT_DIR,
            capture_output=True,
            text=True,
        )
        if result.returncode != 0:
            print("xelatex stdout:", result.stdout[-2000:] if len(result.stdout) > 2000 else result.stdout)
            print("xelatex stderr:", result.stderr[-2000:] if len(result.stderr) > 2000 else result.stderr)
            sys.exit(1)
        # Run twice for references
        subprocess.run(
            ["xelatex", "-interaction=nonstopmode", "-output-directory", SCRIPT_DIR, OUTPUT_TEX],
            cwd=SCRIPT_DIR,
            capture_output=True,
        )
        print(f"Compiled: {OUTPUT_PDF}")


if __name__ == "__main__":
    build()
