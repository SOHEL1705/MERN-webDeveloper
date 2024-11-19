// ThemeChanger.js
import { useEffect } from "react";
import { themeChange } from "theme-change";

const themes = ["light", "dark", "cupcake", "night", "bumblebee", "emerald"];

export const ThemeChanger = () => {
  useEffect(() => {
    // Initialize theme-change library
    themeChange(false);
  }, []);

  return (
    <>
      <button
        className="btn btn-md p-2 text-xs bg-accent text-accent-content hover:text-neutral-content content-center items-center  btn-circle "
        onClick={() => document.getElementById("my_modal_3").showModal()}
      >
       Options
      </button>
      <dialog id="my_modal_3" className="modal">


        
        <div className="modal-box h-96">
          <form className="h-36" method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>

            <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-xs m-1">
            Theme
            <svg
              width="12px"
              height="12px"
              className="inline-block h-2 w-2 fill-current opacity-60"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 2048 2048"
            >
              <path d="M1799 349l242 241-1017 1017L7 590l242-241 775 775 775-775z"></path>
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content bg-base-300 rounded-box w-52 p-2 shadow-2xl"
          >
            {themes.map((theme, index) => (
              <li key={index}>
                <input
                  type="radio"
                  name="theme-dropdown"
                  className="theme-controller btn btn-sm btn-block btn-ghost justify-start"
                  aria-label={`Set theme to ${theme}`}
                  // value={theme} // Set the value to the theme name
                  data-set-theme={theme} // This applies the theme-change attribute
                />
                <label className="ml-2 text-gray-700 dark:text-gray-300 cursor-pointer">
                  {theme.charAt(0).toUpperCase() + theme.slice(1)}
                </label>
              </li>
            ))}
          </ul>
        </div>
          </form>
          <h3 className="font-bold text-lg">Hello!</h3>
          <p className="py-4">Press ESC key or click on ✕ button to close</p>
          <p className="py-4">this will not work until you remove data-theme from app.jsx div</p>
        </div>
       
      </dialog>
    </>
  );
};
