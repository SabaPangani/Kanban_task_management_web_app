export default function FormHeader({ name }: { name: string }) {
  return (
    <h3 className="text-sm font-bold text-neutral-lightGray">
      {name}
    </h3>
  );
}
