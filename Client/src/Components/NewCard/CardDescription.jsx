import './CardHover.css'
export default function CardDescription ({card}) {

    const {image, name, description} = card
    return (
        <div class="news">
    
            <figure className="article">
    
                <img src={`${image}`}  alt='imagen'/>
        
                <figcaption>
    
                    <h3>{name}</h3>
    
                    <p dangerouslySetInnerHTML={{ __html: description }} />
    
                </figcaption>
    
            </figure>
    
    
        </div>
    )
}