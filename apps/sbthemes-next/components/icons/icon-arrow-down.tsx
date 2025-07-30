type IProps = {
    className?: string;
};

const IconArrowDown = ({ className }: IProps) => {
    return (
        <svg
            width="14"
            height="8"
            viewBox="0 0 14 8"
            fill="none"
            className={className}
        >
            <path
                d="M1 1L7 7L13 1"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
            />
        </svg>
    );
};

export default IconArrowDown;
