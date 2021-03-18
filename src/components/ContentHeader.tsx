interface ContentHeaderProps {
    title: string;
}

export function ContentHeader({ title }: ContentHeaderProps) {
    return (
        <header>
            <span className="category">
                Categoria:<span> {title}</span>
            </span>
        </header>
    );
}
