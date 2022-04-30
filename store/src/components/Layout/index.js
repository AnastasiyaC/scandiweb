import React from "react";
import { Outlet } from "react-router-dom";
import classes from "./layout.module.scss";
import Header from "../Header";

class Layout extends React.Component {
    render() {
        return (
            <>
                <Header/>
                <main className={ classes.main }>
                    <div className={ classes.wrapper}>
                        <Outlet />
                    </div>
                </main>
                <footer/>
            </>
        )
    }
}

export default Layout;