// src/components/common/Header/DesktopNav.jsx
import SearchForm from "./SearchForm";
import BackButton from "../BackButton";

export default function DesktopNav({ isHome, cameraButton }) {
    if (isHome) {
        return <SearchForm extraButton={cameraButton} />;
    }
    return <BackButton />;
}