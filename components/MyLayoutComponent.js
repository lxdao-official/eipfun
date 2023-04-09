export default function MyLayoutComponent({ meta, children }) {
  return (
    <div>
      <div>author:{meta.author}</div>
      {children}
    </div>
  );
}
