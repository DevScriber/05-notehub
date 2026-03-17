import { Watch } from "react-loader-spinner"
import css from "./Loader.module.css"

export function Loader() {
    return (
        <div className={css.loaderWrapper}>
            <Watch
                visible={true}
                height="80"
                width="80"
                radius="48"
                color="#dc3545"
                ariaLabel="watch-loading"
                wrapperStyle={{}}
                wrapperClass=""
            />
        </div>
    )
}