import { useRef } from "react";
import "./ChromaGrid.css";

export const ChromaGrid = ({
  items,
  className = "",
  columns = 3,
}) => {
  const demo = [
    {
      image: "https://i.pravatar.cc/300?img=8",
      title: "Alex Rivera",
      subtitle: "Full Stack Developer",
      handle: "@alexrivera",
      borderColor: "#4F46E5",
      gradient: "linear-gradient(145deg, #4F46E5, #000)",
      url: "https://github.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=11",
      title: "Jordan Chen",
      subtitle: "DevOps Engineer",
      handle: "@jordanchen",
      borderColor: "#10B981",
      gradient: "linear-gradient(210deg, #10B981, #000)",
      url: "https://linkedin.com/in/",
    },
    {
      image: "https://i.pravatar.cc/300?img=10",
      title: "Maria Rodriguez",
      subtitle: "UI/UX Designer",
      handle: "@mariar",
      borderColor: "#F59E0B",
      gradient: "linear-gradient(160deg, #F59E0B, #000)",
      url: "https://dribbble.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=15",
      title: "David Lee",
      subtitle: "Data Scientist",
      handle: "@davidlee",
      borderColor: "#EF4444",
      gradient: "linear-gradient(135deg, #EF4444, #000)",
      url: "https://kaggle.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=20",
      title: "Sarah Williams",
      subtitle: "Project Manager",
      handle: "@sarahw",
      borderColor: "#3B82F6",
      gradient: "linear-gradient(180deg, #3B82F6, #000)",
      url: "https://asana.com/",
    },
    {
      image: "https://i.pravatar.cc/300?img=23",
      title: "Tom Wilson",
      subtitle: "Software Engineer",
      handle: "@tomw",
      borderColor: "#6366F1",
      gradient: "linear-gradient(145deg, #6366F1, #000)",
      url: "https://github.com/",
    },
  ];
  const data = items?.length ? items : demo;

  const handleCardClick = (url) => {
    if (url) {
      window.open(url, "_blank", "noopener,noreferrer");
    }
  };

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);
  };

  const renderCards = () => {
    return data.map((c, i) => (
      <article
        key={i}
        className="chroma-card"
        onMouseMove={handleCardMove}
        onClick={() => handleCardClick(c.url)}
        style={{
          "--card-border": c.borderColor || "transparent",
          "--card-gradient": c.gradient,
          cursor: c.url ? "pointer" : "default",
        }}
      >
        <div className="chroma-img-wrapper">
          <img src={c.image} alt={c.title} loading="lazy" />
        </div>
        <footer className="chroma-info">
          <h3 className="name">{c.title}</h3>
          {c.handle && <span className="handle">{c.handle}</span>}
          <p className="role">{c.subtitle}</p>
          {c.location && <span className="location">{c.location}</span>}
        </footer>
      </article>
    ));
  };

  return (
    <div
      className={`chroma-grid ${className}`}
      style={{
        "--cols": columns,
      }}
    >
      {renderCards()}
    </div>
  );
};

export default ChromaGrid;