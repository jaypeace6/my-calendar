import { aboutContent } from './aboutHtml';

export default function AboutContent() {
  return (
    <div>
      <h2 style={{ fontSize: "20px", fontWeight: "bold", textAlign: "center", marginBottom: "20px" }}>
        {aboutContent.title}
      </h2>

      {aboutContent.sections.map((section, index) => (
        <div key={index} style={{ marginBottom: "15px" }}>
          <h3 style={{ fontSize: "14px", fontWeight: "bold", marginTop: "15px", marginBottom: "10px" }}>
            {section.heading}
          </h3>

          {section.type === "paragraph" && (
            <p style={{ marginBottom: "10px" }}>{section.content}</p>
          )}

          {section.type === "paragraph_with_link" && (
            <p style={{ marginBottom: "10px" }}>
              {section.prefix}
              <a href={section.linkUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#0066cc", textDecoration: "underline" }}>
                {section.linkText}
              </a>
              {section.suffix}
            </p>
          )}

          {section.type === "list" && (
            <ul style={{ marginLeft: "20px", marginBottom: "10px" }}>
              {section.items.map((item, itemIndex) => (
                <li key={itemIndex}>{item}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}