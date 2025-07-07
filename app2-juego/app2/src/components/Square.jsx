export const Square = ({ children, isSelected, updateBoard, index }) => {
  const className = `square ${isSelected ? 'is-selected' : ''}`;
  const handleClick = () => {
    updateBoard(index); // Pasar el index aquí
  };

  return ( 
    <div onClick={handleClick} className={className}> {/* Usar handleClick en lugar de updateBoard directamente */}
      {children}
    </div>
  );
};