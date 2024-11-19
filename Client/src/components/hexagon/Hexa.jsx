import "./Hexa.css";

export const Hexa = () => {
  // Combined array of items
  const allItems = [
    "HTML",
    "CSS",
    "JavaScript",
    "C#",
    "Python",
    "Express.js",
    "Node.js",
    "React.js",
    "Angular",
  ];

  // Set the threshold for when to split into two rows
  const threshold = 5;

  // Split items based on the threshold
  const firstAreaItems = allItems.slice(0, threshold);
  const lastAreaItems = allItems.slice(threshold);

  return (
    <div className="hexa-container">
      {/* First row of items */}
      <div className="hexaArea first">
        {firstAreaItems.map((item, index) => (
          <div className="hexa" key={`first-${index}`}>
            <div>{item}</div>
          </div>
        ))}
      </div>

      {/* Second row of items */}
      {lastAreaItems.length > 0 && (
        <div className="hexaArea last">
          {lastAreaItems.map((item, index) => (
            <div className="hexa" key={`last-${index}`}>
              <div>{item}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
