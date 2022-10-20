import './LoadingScreen.scss'
export default function LoadingScreen () {
    return (
        <div className='body-loading' >
            <div class="e-loadholder">
                <div id="particleCanvas-Blue"></div>
                    <div class="m-loader">
                        <span class="e-text">Loading</span>
                    </div>
            <div id="particleCanvas-White"></div>
            </div>
        </div>
    )
}