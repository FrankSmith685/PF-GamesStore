import '../Landing_Page/Cardhover2.css'


export default function CardHover2({ name, image, price }) {
    return (
        <div class="wrapper2">

            <div class="cards2">
                <figure class="card2">
                    <img src={`${image}`} alt='imagen' />
                    <figcaption>{name} {price ? `$ ${price}` : null}</figcaption>

                </figure>

            </div>

        </div>
    )
}