import {
  Building2,
  GraduationCap,
  Briefcase,
  Award,
} from "lucide-react";
import {
  Card,
  Button,
  SectionTitle,
  cx,
} from "../../../components/primitives";
import type { ExperienceEntry, EducationEntry, ProjectEntry } from "./types";
import { EXPERIENCE_FULL, EDUCATION_FULL, PROJECTS_FULL } from "./data";

function WorkHistorySection({ entries }: { entries: ExperienceEntry[] }) {
  return (
    <div>
      <SectionTitle title="Work Experience" action={
        <Button size="sm" variant="secondary">+ Add experience</Button>
      } />
      <Card className="overflow-hidden">
        {entries.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-3 grid size-12 place-items-center rounded-[11px] bg-brand-50 text-brand-600">
              <Briefcase className="size-6" />
            </div>
            <div className="text-[13.5px] font-semibold text-ink">No work experience added</div>
            <p className="mt-1 text-[12.5px] text-muted">
              Add your work history. Skills mentioned in your roles can be used as supporting evidence.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-line-soft">
            {entries.map((e, idx) => (
              <div key={e.id} className="flex gap-4 px-5 py-4">
                <div className="flex flex-col items-center pt-1">
                  <div className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-brand-100 text-brand-600">
                    <Building2 className="size-4" />
                  </div>
                  {idx < entries.length - 1 && (
                    <div className="mt-2 flex-1 border-l-2 border-dashed border-line-soft" />
                  )}
                </div>
                <div className={cx("flex-1", idx < entries.length - 1 && "pb-4")}>
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <div className="text-[14.5px] font-bold text-ink">{e.role}</div>
                      <div className="text-[13px] text-muted">
                        {e.company} · {e.start}–{e.end ?? "Present"}
                      </div>
                    </div>
                    <Button size="sm" variant="ghost">Edit</Button>
                  </div>
                  <p className="mt-2 text-[13px] text-muted">{e.desc}</p>
                  {e.skills.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {e.skills.map((s) => (
                        <span key={s} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[12px] font-medium text-brand-700">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function EducationSection({ entries }: { entries: EducationEntry[] }) {
  return (
    <div>
      <SectionTitle title="Education &amp; Certifications" action={
        <Button size="sm" variant="secondary">+ Add education</Button>
      } />
      <Card className="overflow-hidden">
        {entries.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-3 grid size-12 place-items-center rounded-[11px] bg-brand-50 text-brand-600">
              <GraduationCap className="size-6" />
            </div>
            <div className="text-[13.5px] font-semibold text-ink">No education added</div>
            <p className="mt-1 text-[12.5px] text-muted">
              Add your degrees, diplomas, or professional certifications.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-line-soft">
            {entries.map((e) => (
              <div key={e.id} className="flex items-center gap-4 px-5 py-4">
                <div className="grid size-8 shrink-0 place-items-center rounded-[8px] bg-brand-100 text-brand-600">
                  <GraduationCap className="size-4" />
                </div>
                <div className="flex-1">
                  <div className="text-[14px] font-bold text-ink">{e.degree}</div>
                  <div className="text-[12.5px] text-muted">{e.institution} · {e.year}</div>
                </div>
                <Button size="sm" variant="ghost">Edit</Button>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

function ProjectsSection({ entries }: { entries: ProjectEntry[] }) {
  return (
    <div>
      <SectionTitle title="Projects &amp; Achievements" action={
        <Button size="sm" variant="secondary">+ Add project</Button>
      } />
      <Card className="overflow-hidden">
        {entries.length === 0 ? (
          <div className="p-8 text-center">
            <div className="mx-auto mb-3 grid size-12 place-items-center rounded-[11px] bg-brand-50 text-brand-600">
              <Award className="size-6" />
            </div>
            <div className="text-[13.5px] font-semibold text-ink">No projects added</div>
            <p className="mt-1 text-[12.5px] text-muted">
              Add portfolio work, open-source contributions, or achievements that demonstrate your skills.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-line-soft">
            {entries.map((e) => (
              <div key={e.id} className="px-5 py-4">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-[14px] font-bold text-ink">{e.title}</div>
                    <div className="text-[12px] font-medium text-brand-600">{e.url}</div>
                  </div>
                  <div className="flex shrink-0 items-center gap-2">
                    <span className="text-[12px] text-faint">{e.date}</span>
                    <Button size="sm" variant="ghost">Edit</Button>
                  </div>
                </div>
                <p className="mt-1.5 text-[13px] text-muted">{e.desc}</p>
                {e.skills.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {e.skills.map((s) => (
                      <span key={s} className="rounded-full bg-brand-50 px-2.5 py-0.5 text-[12px] font-medium text-brand-700">
                        {s}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}

export function Experience({ isNew }: { isNew: boolean }) {
  return (
    <div className="space-y-8">
      <WorkHistorySection entries={isNew ? [] : EXPERIENCE_FULL} />
      <ProjectsSection entries={isNew ? [] : PROJECTS_FULL} />
      <EducationSection entries={isNew ? [] : EDUCATION_FULL} />
    </div>
  );
}
