import { IconContext } from "react-icons";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";

export default function Footer() {
  return <div className="flex my-8">
    <div className="w-5/12 md:w-8/12"></div>
    <div className="flex justify-around items-center">
      <p className="md:mx-4">Created by @Leon</p>
      <IconContext.Provider value={{
        size: '44',
      }}>
        <a href="https://github.com/leon3108" target="_blank">
          <AiFillGithub className="mx-4" />
        </a>
        <a href="https://www.linkedin.com/in/maxime-noel-lyon/" target="_blank">
          <AiFillLinkedin className="mx-4" />
        </a>
      </IconContext.Provider >
    </div>
  </div>
}