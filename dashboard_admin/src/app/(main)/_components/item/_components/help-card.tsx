import { HelpCircle } from "lucide-react";

const HelpCard = () => {
  return (
    <div className="p-4 relative mx-4 my-4 rounded-2xl bg-[#01C4FF] space-y-5 shadow-md shadow-[#01C4FF]">
      <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center">
        <HelpCircle className="w-5 h-5 text-[#01C4FF] " />
      </div>
      <div className="space-y-2">
        <div className="text-white">
          <h1 className="font-semibold text-lg">Need help?</h1>
          <p className="font-medium text-sm">Please check our docs</p>
        </div>
        <button className="rounded-xl bg-white w-full font-semibold py-2">
          DOCUMENTATION
        </button>
      </div>
      {/* <svg
        className="absolute -bottom-2/3 -right-1/2"
        height="229"
        width="229"
        fill="none"
        viewBox="0 0 229 229"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M114.5 228C177.184 228 228 177.184 228 114.5C228 51.8157 177.184 1 114.5 1C51.8157 1 1 51.8157 1 114.5C1 177.184 51.8157 228 114.5 228Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M114.5 218.967C172.195 218.967 218.967 172.195 218.967 114.499C218.967 56.8038 172.195 10.0322 114.5 10.0322C56.804 10.0322 10.0324 56.8038 10.0324 114.499C10.0324 172.195 56.804 218.967 114.5 218.967Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M114.5 209.931C167.205 209.931 209.931 167.205 209.931 114.5C209.931 61.795 167.205 19.0691 114.5 19.0691C61.795 19.0691 19.0691 61.795 19.0691 114.5C19.0691 167.205 61.795 209.931 114.5 209.931Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M114.5 200.898C162.216 200.898 200.898 162.216 200.898 114.5C200.898 66.7834 162.216 28.1016 114.5 28.1016C66.7832 28.1016 28.1014 66.7834 28.1014 114.5C28.1014 162.216 66.7832 200.898 114.5 200.898Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M114.5 191.862C157.226 191.862 191.862 157.226 191.862 114.5C191.862 71.7742 157.226 37.1379 114.5 37.1379C71.7744 37.1379 37.1382 71.7742 37.1382 114.5C37.1382 157.226 71.7744 191.862 114.5 191.862Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M114.5 182.829C152.237 182.829 182.829 152.237 182.829 114.5C182.829 76.7628 152.237 46.1707 114.5 46.1707C76.7627 46.1707 46.1706 76.7628 46.1706 114.5C46.1706 152.237 76.7627 182.829 114.5 182.829Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M114.5 173.794C147.247 173.794 173.794 147.247 173.794 114.5C173.794 81.7537 147.247 55.2073 114.5 55.2073C81.7537 55.2073 55.2073 81.7537 55.2073 114.5C55.2073 147.247 81.7537 173.794 114.5 173.794Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M114.5 164.761C142.258 164.761 164.76 142.258 164.76 114.5C164.76 86.7421 142.258 64.2397 114.5 64.2397C86.742 64.2397 64.2396 86.7421 64.2396 114.5C64.2396 142.258 86.742 164.761 114.5 164.761Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M114.5 155.724C137.267 155.724 155.724 137.267 155.724 114.5C155.724 91.7321 137.267 73.2754 114.5 73.2754C91.7321 73.2754 73.2754 91.7321 73.2754 114.5C73.2754 137.267 91.7321 155.724 114.5 155.724Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M114.5 146.692C132.279 146.692 146.692 132.279 146.692 114.5C146.692 96.7215 132.279 82.3088 114.5 82.3088C96.7215 82.3088 82.3088 96.7215 82.3088 114.5C82.3088 132.279 96.7215 146.692 114.5 146.692Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M114.5 137.655C127.288 137.655 137.655 127.288 137.655 114.5C137.655 101.711 127.288 91.3442 114.5 91.3442C101.711 91.3442 91.3445 101.711 91.3445 114.5C91.3445 127.288 101.711 137.655 114.5 137.655Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
        <path
          d="M114.5 128.622C122.3 128.622 128.623 122.299 128.623 114.5C128.623 106.7 122.3 100.377 114.5 100.377C106.701 100.377 100.378 106.7 100.378 114.5C100.378 122.299 106.701 128.622 114.5 128.622Z"
          stroke="white"
          strokeLinecap="round"
          strokeOpacity="0.3"
        />
      </svg> */}
    </div>
  );
};

export default HelpCard;
