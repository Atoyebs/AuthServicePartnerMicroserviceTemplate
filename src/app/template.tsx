export default function Template(props: { children: React.ReactNode }) {

  const { children } = props;

  return (<main className="flex flex-col items-center h-screen w-screen bg-white">
    {children}
  </main>);
}