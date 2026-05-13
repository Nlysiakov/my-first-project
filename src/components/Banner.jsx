import "../pageStyles/BannerStyle.css";


const Banner=()=>{

  return (
    <div className="banner">
      
      <div className="banner__gradient-1"></div>
      <div className="banner__gradient-2"></div>
      <div className="banner__content">
        <div className="banner__text">ВСЁ В ДОМ! РАСПРОДАЖА</div>
        <img className="banner__image" src="https://ir.ozone.ru/s3/blackfriday-widgets-api-images/img/wc600/616_counter_embed_desktop_announcementLogo_527f1b7b-9776-4d2a-9624-7ebed2332068.png" alt="" />
      </div>

    </div>
  )
}
export default Banner