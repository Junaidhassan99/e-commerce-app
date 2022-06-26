const Card: React.FC<{
  additionClasses?: string;
  children: React.ReactNode;
}> = ({ children, additionClasses }) => {
  return (
    <div className={`bg-white p-5 rounded-lg ${additionClasses}`}>
      {children}
    </div>
  );
};

export default Card;
