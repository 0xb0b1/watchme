import React, { useState, useEffect } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

interface SideBarProps {
    genres: Array<{
        id: number;
        title: string;
        name:
            | "action"
            | "comedy"
            | "documentary"
            | "drama"
            | "horror"
            | "family";
    }>;
    selectedGenreId: number;
    handleClickButton: (id: number) => void;
}

export function SideBar({
    genres,
    handleClickButton,
    selectedGenreId,
}: SideBarProps) {
    // Complete aqui
    return (
        <nav className="sidebar">
            <span>
                Watch<p>Me</p>
            </span>

            <div className="buttons-container">
                {genres.map((genre) => (
                    <Button
                        id={String(genre.id)}
                        title={genre.title}
                        iconName={genre.name}
                        onClick={() => handleClickButton(genre.id)}
                        selected={selectedGenreId === genre.id}
                    />
                ))}
            </div>
        </nav>
    );
}
