import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";

export interface Meta {
  name: string;
  title: string;
  email: string;
  phone?: string;
  location: string;
  website: string;
  linkedin: string;
  github: string;
  summary: string;
}

export interface Education {
  institution: string;
  degree: string;
  date: string;
  location?: string;
  gpa?: string;
  highlights: string[];
}

export interface Experience {
  company: string;
  role: string;
  date: string;
  location: string;
  bullets: string[];
}

export interface SkillCategory {
  name: string;
  items: string[];
}

export interface Patent {
  title: string;
  number?: string;
  status: string;
  year: number;
}

export interface Vault {
  meta: Meta;
  education: Education[];
  experience: Experience[];
  skills: { categories: SkillCategory[] };
  patents: Patent[];
  entrepreneurship: string[];
  awards: string[];
}

let cached: Vault | null = null;

export function getVault(): Vault {
  if (cached) return cached;
  const vaultPath = path.resolve(
    import.meta.dirname,
    "..",
    "..",
    "..",
    "data",
    "vault.yaml",
  );
  const raw = fs.readFileSync(vaultPath, "utf-8");
  cached = YAML.parse(raw) as Vault;
  return cached;
}
