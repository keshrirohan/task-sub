import React, { useRef, useEffect, useState } from "react";
import { Send, User, Link2, Calendar } from "lucide-react";
import gsap from "gsap";
import { handlefailed, handlesuccess } from "./utils";

const SubmitForm = () => {
  const cardRef = useRef(null);
  const titleRef = useRef(null);
  const formRef = useRef(null);
  const inputRefs = useRef([]);
  const buttonRef = useRef(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    Fullname: "",
    Task: "",
    Submitdate: "",
  });

  useEffect(() => {
    const card = cardRef.current;
    const title = titleRef.current;
    const inputs = inputRefs.current;
    const button = buttonRef.current;

    // Initial setup - hide elements
    gsap.set(card, { y: 100, opacity: 0, scale: 0.9 });
    gsap.set(title, { y: 50, opacity: 0 });
    gsap.set(inputs, { x: -30, opacity: 0 });
    gsap.set(button, { scale: 0.8, opacity: 0 });

    // Animate entrance
    const tl = gsap.timeline();
    tl.to(card, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 1.2,
      ease: "power4.out",
    })
      .to(
        title,
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
        },
        "-=0.8"
      )
      .to(
        inputs,
        {
          x: 0,
          opacity: 1,
          duration: 0.6,
          stagger: 0.15,
          ease: "power2.out",
        },
        "-=0.4"
      )
      .to(
        button,
        {
          scale: 1,
          opacity: 1,
          duration: 0.5,
          ease: "back.out(1.7)",
        },
        "-=0.2"
      );

    // Hover animation
    inputs.forEach((input) => {
      input?.addEventListener("mouseenter", () => {
        gsap.to(input, { scale: 1.02, duration: 0.3 });
      });
      input?.addEventListener("mouseleave", () => {
        gsap.to(input, { scale: 1, duration: 0.3 });
      });
    });

    if (button) {
      button.addEventListener("mouseenter", () => {
        gsap.to(button, { scale: 1.05, duration: 0.3 });
      });
      button.addEventListener("mouseleave", () => {
        gsap.to(button, { scale: 1, duration: 0.3 });
      });
    }
  }, []);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    let { Fullname, Task, Submitdate } = formData;

    if (!Fullname || !Task || !Submitdate) {
      handlefailed("Please fill in all fields");
      return;
    }

    setIsSubmitting(true);

    try {
      const url = "http://localhost:3000/submit";
      const response = await fetch(url, {
        method: "POST", // ✅ correct casing
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log(result);

      // ✅ Alert message from backend
      // handlefailed(result.message);

      if (!response.ok) {
        handlefailed(result.message || "Submission failed");
      } else {
        handlesuccess(result.message || "Task submitted successfully!");
      }
    } catch (error) {
      console.log("Error on submit:", error);
      alert("Server error");
      handlefailed("Server error");
    }

    // Animate on submit
    gsap.to(buttonRef.current, {
      scale: 0.95,
      duration: 0.1,
      yoyo: true,
      repeat: 1,
    });

    await new Promise((resolve) => setTimeout(resolve, 1000));

    gsap.to(cardRef.current, {
      scale: 1.05,
      duration: 0.3,
      yoyo: true,
      repeat: 1,
    });

    setIsSubmitting(false);
  };

  return (
    <div className="w-screen min-h-[100dvh] bg-gradient-to-br from-black via-zinc-900 to-blue-900 text-white flex items-center justify-center px-4 py-10">
      <div
        ref={cardRef}
        className="w-full max-w-lg bg-zinc-900/90 backdrop-blur-xl p-8 sm:p-10 rounded-2xl shadow-[0_0_60px_rgba(59,130,246,0.5)] border border-zinc-800/50"
      >
        {/* Logo + Title */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 mb-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
            {/* <img className="text-2xl font-bold" s /> */}
            <a target="_blank" href="https://byteminders.com/">
              <img
                src="https://res.cloudinary.com/dj9vanzqq/image/upload/v1751801169/Byte_Minders_1_jrme3e.png"
                alt="logo"
              />
            </a>
          </div>
          <h1
            ref={titleRef}
            className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-center"
          >
            ByteMinders Task Submission
          </h1>
        </div>

        {/* Form */}
        <div ref={formRef} className="space-y-6 w-full">
          {/* Full Name */}
          <div>
            <label
              htmlFor="Fullname"
              className="block text-sm mb-2 text-zinc-300 flex items-center gap-2"
            >
              <User size={16} />
              Full Name
            </label>
            <input
              id="Fullname"
              ref={(el) => (inputRefs.current[0] = el)}
              type="text"
              placeholder="Enter your name"
              value={formData.Fullname}
              onChange={(e) => handleInputChange("Fullname", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800/70 text-white border border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-400"
            />
          </div>

          {/* Task Link */}
          <div>
            <label
              htmlFor="Task"
              className="block text-sm mb-2 text-zinc-300 flex items-center gap-2"
            >
              <Link2 size={16} />
              Task Link
            </label>
            <input
              id="Task"
              ref={(el) => (inputRefs.current[1] = el)}
              type="url"
              placeholder="https://..."
              value={formData.Task}
              onChange={(e) => handleInputChange("Task", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800/70 text-white border border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-zinc-400"
            />
          </div>

          {/* Submission Date */}
          <div>
            <label
              htmlFor="Submitdate"
              className="block text-sm mb-2 text-zinc-300 flex items-center gap-2"
            >
              <Calendar size={16} />
              Submission Date
            </label>
            <input
              id="Submitdate"
              ref={(el) => (inputRefs.current[2] = el)}
              type="date"
              value={formData.Submitdate}
              onChange={(e) => handleInputChange("Submitdate", e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-zinc-800/70 text-white border border-zinc-600/50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit Button */}
          <button
            type="button"
            ref={buttonRef}
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="mt-6 w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 shadow-lg disabled:opacity-70 disabled:cursor-not-allowed font-semibold"
          >
            {isSubmitting ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                Submitting...
              </>
            ) : (
              <>
                <Send size={18} />
                Submit Task
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubmitForm;
