type MessageErrorProps = {
  message: string | undefined;
};

export const MessageError = ({ message }: MessageErrorProps) => {
  return <p className="text-xs text-red-500 absolute -bottom-4">{message}</p>;
};
