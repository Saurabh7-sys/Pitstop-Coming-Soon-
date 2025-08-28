import React, { useState, useRef, useEffect } from "react";
import { FiBell, FiX, FiCheckCircle } from "react-icons/fi";
import { FaBiking } from "react-icons/fa";
import { gsap } from "gsap";
import style from "./notifyMe.module.css";

const NotifyMe = () => {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false); // ⬅️ new state
  const popupRef = useRef(null);
  const successRef = useRef(null);
  const bikeRef = useRef(null);
  const trackRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpen(true);
    }, 5000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (open) {
      gsap.fromTo(
        popupRef.current,
        { opacity: 0, y: 50, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: "power3.out" }
      );
    }
  }, [open]);

  useEffect(() => {
    if (success) {
      gsap.fromTo(
        successRef.current,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.7)" }
      );

      const trackWidth = trackRef.current.offsetWidth - 24;
      gsap.fromTo(
        bikeRef.current,
        { x: 0 },
        { x: trackWidth, duration: 3, ease: "linear" }
      );

      const timer = setTimeout(() => {
        gsap.to(successRef.current, {
          opacity: 0,
          y: 40,
          duration: 0.5,
          ease: "power2.in",
          onComplete: () => setSuccess(false),
        });
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim().toLowerCase();

    let storedEmails = JSON.parse(localStorage.getItem("emails")) || [];

    if (storedEmails.includes(email)) {
      setError("This email already exists");
      setSuccess(false);
      return;
    }

    storedEmails.push(email);
    localStorage.setItem("emails", JSON.stringify(storedEmails));

    const formDataToSend = new URLSearchParams();
    formDataToSend.append("email", email);
    formDataToSend.append("submittedAt", new Date().toLocaleString());

    setLoading(true); // ⬅️ start loading
    try {
      await fetch(
        "https://script.google.com/macros/s/AKfycbwPugRTZINdU-6MTRxUzX4uU4-SQYB3k5Co8YA5R2cle0kOlFsOTbcZzb4D9Sf8NKOH/exec",
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: formDataToSend.toString(),
        }
      );

      setError("");
      e.target.reset();
      setOpen(false);
      setSuccess(true);
    } catch (err) {
      console.error(err);
      setError("Something went wrong, please try again.");
    } finally {
      setLoading(false); // ⬅️ stop loading
    }
  };

  return (
    <div className={style.container}>
      <button className={style.floatingBtn} onClick={() => setOpen(!open)}>
        <FiBell size={24} />
      </button>

      {open && (
        <div ref={popupRef} className={style.popup}>
          <div className={style.header}>
            <h4>Notify Me</h4>
            <FiX
              size={20}
              className={style.close}
              onClick={() => setOpen(false)}
            />
          </div>
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Drop your mail..."
              required
            />
            {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
            <button type="submit" disabled={loading}>
              {loading ? <span className={style.spinner}></span> : "Submit"}
            </button>
          </form>
        </div>
      )}

      {success && (
        <div ref={successRef} className={style.successMsg}>
          <div className={style.successText}>
            <FiCheckCircle size={22} className={style.successIcon} />
            <span>You’ll be notified!</span>
          </div>
          <div ref={trackRef} className={style.track}>
            <FaBiking ref={bikeRef} size={20} className={style.bikeIcon} />
          </div>
        </div>
      )}
    </div>
  );
};

export default NotifyMe;
