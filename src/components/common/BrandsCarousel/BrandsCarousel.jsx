import "./BrandsCarousel.css";

const BrandsCarousel = ({
    brands = [],
    speed = 35,
    pauseOnHover = true,
    grayscale = true,
}) => {
    const items = [...brands, ...brands];

    return (
        <section className="brands-carousel">
            <div
                className={`brands-carousel__track ${pauseOnHover ? "brands-carousel__track--pause" : ""
                    }`}
                style={{
                    animationDuration: `${speed}s`,
                }}
            >
                {items.map((brand, index) => (
                    <a
                        key={`${brand.id}-${index}`}
                        href={brand.website}
                        target="_blank"
                        rel="noreferrer"
                        className={`brands-carousel__item ${grayscale ? "brands-carousel__item--gray" : ""
                            }`}
                    >
                        <img
                            src={brand.logo}
                            alt={brand.name}
                            loading="lazy"
                        />
                    </a>
                ))}
            </div>
        </section>
    );
};

export default BrandsCarousel;