"use client";

interface SettingsFormProps {
  title: string;
  description: string;
  children: React.ReactNode;
}

export function SettingsForm({ title, description, children }: SettingsFormProps) {
  return (
    <div>
      <div>
        <h3 className="text-lg font-semibold text-black">{title}</h3>
        <p className="mt-1 text-sm text-grey-500">{description}</p>
      </div>
      <div className="my-5 border-t border-border-light" />
      <div>{children}</div>
    </div>
  );
}
