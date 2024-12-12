import React, { useState } from "react";
import { Container, ListGroup } from "react-bootstrap";

const SidePushNav = ({ links, toggleNav, isNavOpen }) => {
  return (
    <div>
      {/* Sidebar */}
      <div
        style={{
          height: "100%",
          width: "500px",
          position: "fixed",
          zIndex: 1,
          top: 0,
          right: 0,
          backgroundColor: "aliceblue",
          transform: isNavOpen ? "translateX(0)" : "translateX(100%)", // Slide in/out
          transition: "transform 0.5s ease", // Smooth animation
          paddingTop: "30px",
        }}
      >
        {/* Close button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingBottom: "30px",
          }}
          onClick={() => toggleNav()}
        >
          <a
            href="#"
            style={{
              padding: "8px 8px 8px 32px",
              textDecoration: "none",
              fontSize: "25px",
              color: "black",
              display: "block",
              transition: "0.3s",
            }}
          >
            Mapped Curricula
          </a>

          <a
            href="#"
            style={{
              padding: "8px 8px 8px 32px",
              textDecoration: "none",
              fontSize: "25px",
              color: "black",
              display: "block",
              transition: "0.3s",
            }}
          >
            &times;
          </a>
        </div>

        {/* Dynamically render links */}
        <Container>
          {links.length !== 0 ? (
            <ListGroup>
              {links.map((link, index) => (
                <ListGroup.Item action key={index} href={link.href}>
                  {link.id} - {link.name}
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <h3 className="text-md px-4">No Curriculum is mapped</h3>
          )}
        </Container>
      </div>
    </div>
  );
};

export default SidePushNav;
