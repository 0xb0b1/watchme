import { useEffect, useState } from "react";

import { api } from "./services/api";

import "./styles/global.scss";
import "./styles/content.scss";
import "./styles/sidebar.scss";

import { SideBar } from "./components/SideBar";
import { Content } from "./components/Content";
import { ContentHeader } from "./components/ContentHeader";

interface GenreResponseProps {
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
}

interface MovieProps {
    Title: string;
    Poster: string;
    Ratings: Array<{
        Source: string;
        Value: string;
    }>;
    Runtime: string;
}

export function App() {
    const [selectedGenreId, setSelectedGenreId] = useState(1);

    const [genres, setGenres] = useState<GenreResponseProps[]>([]);

    const [movies, setMovies] = useState<MovieProps[]>([]);
    const [selectedGenre, setSelectedGenre] = useState<GenreResponseProps>(
        {} as GenreResponseProps
    );

    useEffect(() => {
        api.get<GenreResponseProps[]>("genres").then((response) => {
            setGenres(response.data);
        });
    }, []);

    useEffect(() => {
        api.get<MovieProps[]>(`movies/?Genre_id=${selectedGenreId}`).then(
            (response) => {
                setMovies(response.data);
            }
        );

        api.get<GenreResponseProps>(`genres/${selectedGenreId}`).then(
            (response) => {
                setSelectedGenre(response.data);
            }
        );
    }, [selectedGenreId]);

    function handleClickButton(id: number) {
        setSelectedGenreId(id);
    }

    return (
        <div style={{ display: "flex", flexDirection: "row" }}>
            <SideBar
                genres={genres}
                handleClickButton={handleClickButton}
                selectedGenreId={selectedGenreId}
            />

            <div className="container">
                <ContentHeader title={selectedGenre.title} />
                <Content movies={movies} />
            </div>
        </div>
    );
}
