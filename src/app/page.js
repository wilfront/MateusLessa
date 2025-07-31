import './globals.css';

export default function Home() {
  return (
    <div className="home">
      <video className="video-bg" autoPlay loop muted playsInline>
        <source src="/video-paper/mateus-lessa.mp4" type="video/mp4" />
      </video>

      <div className="overlay" />
    </div>
  );
}
