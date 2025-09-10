import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import b from '../assets/b1.avif';
import g from '../assets/pic-girl.jpg';
import b11 from '../assets/b1.avif';
import g11 from '../assets/g2.avif';
import b7 from '../assets/g4.avif';
import gi from '../assets/pgi.jpg';



const reviews = [
  {
    name: "Aarav Mehta",
    text: "I discovered so many amazing books here! This platform keeps me motivated to read daily.",
    role: "Book Enthusiast",
    img: b
  },
  {
    name: "Sophia Williams",
    text: "A place where I can share my reviews and find recommendations.",
    role: "Literature Student",
    img: g
  },
  {
    name: "Rajesh Kumar",
    text: "Joining this community has helped me rebuild my reading habit. Love it!",
    role: "Software Engineer",
    img: b11
  },
  {
    name: "Emily Carter",
    text: "I never run out of book ideas anymore. This platform is a true reader’s paradise.",
    role: "Writer",
    img: g11
  },
  {
    name: "Nikhil Sharma",
    text: "A wonderful way to connect with passionate readers and share thoughts on books.",
    role: "Teacher",
    img: b7
  },
  {
    name: "Isabella Brown",
    text: "Discovering hidden gems here has made reading even more exciting for me.",
    role: "Content Creator",
    img: gi
  }
];

function Testimonials() {
  return (
    <>
      <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">
        
      </h2>
      <Swiper
        modules={[Pagination, Autoplay]}
        spaceBetween={20}
        autoplay={{ delay: 3500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        loop={true}
        breakpoints={{
          320: { slidesPerView: 1 },   
          640: { slidesPerView: 2 },   
          1024: { slidesPerView: 3 }   
        }}
      >
        {reviews.map((r, index) => (
   <SwiperSlide key={index}>
  <div
    className="p-6 rounded-2xl shadow-md flex flex-col items-center text-center h-full border-2"
    style={{
      borderColor: "var(--primary-400)",
      background: "var(--neutral-100)",   
      color: "var(--text-primary)"       
    }}
  >
    <img
      src={r.img}
      alt={r.name}
      className="w-20 h-20 rounded-full mb-4 object-cover"
      style={{
        border: "2px solid var(--primary-400)"
      }}
    />

    <p style={{ color: "var(--text-secondary)" }}>
      "{r.text}"
    </p>

    <h3
      className="font-semibold text-lg"
      style={{ color: "var(--primary-500)" }}
    >
      {r.name}
    </h3>

    <span
      className="text-sm"
      style={{ color: "var(--text-muted)" }}
    >
      {r.role}
    </span>
  </div>
     </SwiperSlide>
        ))}
      </Swiper>
      
    </div>
    

</>    
  );
}

export default Testimonials;
