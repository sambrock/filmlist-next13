type ServerClientProps = {
  server?: React.ReactNode ;
  client?: React.ReactNode;
};

export const ServerClient = ({ server, client }: ServerClientProps) => {
  const isClient = typeof window !== 'undefined';
  return isClient ? client : server;
};
