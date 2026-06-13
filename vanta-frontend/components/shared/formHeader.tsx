interface FormHeaderProps {
  title: string;
  description: string;
}
export default function FormHeader({ title, description }: FormHeaderProps) {
  return (
    <div className="flex flex-col items-center text-center mb-8">
      <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-zinc-950 text-white dark:bg-white dark:text-zinc-950 font-black text-xl mb-4 shadow-md tracking-wider">
        V
      </div>
      <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h1>
      <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-1.5">
        {description}
      </p>
    </div>
  );
}
