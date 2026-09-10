import { useState } from "react";
import { useEmployer } from "../employerStore";
import { CreateRole, JobDNAEditor } from "./JobDNAEditor";

export function JobDNA({ go }: { go: (r: string) => void }) {
    const emp = useEmployer();
    const [creating, setCreating] = useState(false);
    const role = emp.editingRole ?? emp.roles[emp.roles.length - 1] ?? null;
  
    if (creating || !role) {
      return (
        <CreateRole
          hasRoles={emp.roles.length > 0}
          onCancel={() => setCreating(false)}
          onCreated={() => setCreating(false)}
        />
      );
    }
  
    return <JobDNAEditor role={role} go={go} onNewRole={() => setCreating(true)} />;
  }