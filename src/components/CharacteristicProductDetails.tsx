import "../styles/characteristicProducts.css";

const CharacteristicProductDetails = ({ label, value }) => {
  return (
    <div>
      <div className="characteristicContainer">
        <div>{label}</div>
        <div>{value}</div>
      </div>
      <hr />
    </div>
  );
};

export default CharacteristicProductDetails;
