export default function Message({ text }) {
  if (!text) return null;
  return <p className="message">{text}</p>;
}
