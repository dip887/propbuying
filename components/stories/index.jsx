import { useRef, useEffect } from "react";
import { Zuck } from "zuck.js";
import "zuck.js/css";
import "zuck.js/skins/snapgram";

const Stories = () => {
  const storiesEl = useRef(null);
  const storiesFunc = useRef(null);

  useEffect(() => {
    if (storiesEl.current && !storiesFunc.current) {
      storiesFunc.current = Zuck(storiesEl.current, {
        backNative: true,
        previousTap: true,
        skin: "snapgram",
        autoFullScreen: true,
        avatars: true,
        paginationArrows: true,
        list: true,
        cubeEffect: true,
        localStorage: true,
        stories: [
          {
            id: "ramon",
            photo:
              "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/1.jpg",
            name: "Ramon",
            items: [
              {
                id: "ramon-1",
                type: "photo",
                length: 3,
                src: "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/1.jpg",
                preview:
                  "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/1.jpg",
                link: "",
                linkText: false,
              },
              {
                id: "ramon-2",
                type: "video",
                length: 0,
                src: "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/2.mp4",
                preview:
                  "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/2.jpg",
                link: "",
                linkText: false,
              },
              {
                id: "ramon-3",
                type: "photo",
                length: 3,
                src: "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/3.png",
                preview:
                  "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/3.png",
                link: "https://ramon.codes",
                linkText: "Visit my Portfolio",
              },
            ],
          },
          {
            id: "gorillaz",
            photo:
              "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/2.jpg",
            name: "Gorillaz",
            items: [
              {
                id: "gorillaz-1",
                type: "video",
                length: 0,
                src: "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/4.mp4",
                preview:
                  "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/4.jpg",
                link: "",
                linkText: false,
              },
              {
                id: "gorillaz-2",
                type: "photo",
                length: 3,
                src: "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/5.jpg",
                preview:
                  "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/5.jpg",
                link: "",
                linkText: false,
              },
            ],
          },
          {
            id: "ladygaga",
            photo:
              "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/3.jpg",
            name: "Lady Gaga",
            items: [
              {
                id: "ladygaga-1",
                type: "photo",
                length: 5,
                src: "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/6.jpg",
                preview:
                  "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/6.jpg",
                link: "",
                linkText: false,
              },
              {
                id: "ladygaga-2",
                type: "photo",
                length: 3,
                src: "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/7.jpg",
                preview:
                  "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/7.jpg",
                link: "http://ladygaga.com",
                linkText: false,
              },
            ],
          },
          {
            id: "starboy",
            photo:
              "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/4.jpg",
            name: "The Weeknd",
            items: [
              {
                id: "starboy-1",
                type: "photo",
                length: 5,
                src: "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/8.jpg",
                preview:
                  "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/8.jpg",
                link: "",
                linkText: false,
              },
            ],
          },
          {
            id: "riversquomo",
            photo:
              "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/users/5.jpg",
            name: "Rivers Cuomo",
            items: [
              {
                id: "riverscuomo-1",
                type: "photo",
                length: 10,
                src: "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/9.jpg",
                preview:
                  "https://raw.githubusercontent.com/ramonszo/assets/master/zuck.js/stories/9.jpg",
                link: "",
                linkText: false,
              },
            ],
          },
        ],
      });
    }
  }, [storiesEl.current]);

  return (
    <div
      className="storiesWrapper d-flex items-center"
      id="stories"
      ref={storiesEl}
    ></div>
  );
};

export default Stories;
