export default function FormHeader({ name }: { name: string }) {
  return (
    <h3 className="text-sm font-medium text-neutral-lightGray">
      {name}
    </h3>
  );
}
