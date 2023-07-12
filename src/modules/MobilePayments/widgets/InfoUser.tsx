interface Props {
  user: {
    name: string;
    document: string;
  };
}

const InfoUser = ({ user }: Props) => {
  return (
    // Ocupa solo 1/3 del ancho de la pantalla y al final de la misma
    <div className="w-1/3 ml-auto text-right">
      <div>
        Cuentahabiente: <span className="font-bold">{user.name}</span>
      </div>
      <div>
        Documento: <span className="font-bold">{user.document}</span>
      </div>
    </div>
  );
};

export default InfoUser;
