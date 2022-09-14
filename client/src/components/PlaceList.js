import styled from "styled-components"

const ListThumbnail = () => {
    return(
        <PlaceList>
            <li>
                <div>
                    <span className="place-img"><img src="https://files.ban-life.com/content/2020/07/content_body_15959024240.jpg" alt="" /></span>
                    <div className="place-info">
                        <p>카페더왈츠</p>
                        <span>1.5km 이내</span>
                    </div>
                </div>
            </li>

            <li>
                <div>
                    <span className="place-img"><img src="https://files.ban-life.com/content/2020/10/content_body_16031808390.jpg" alt="" /></span>
                    <div className="place-info">
                        <p>꼬리살랑</p>
                        <span>1.5km 이내</span>
                    </div>
                </div>
            </li>

            <li>
                <div>
                    <span className="place-img"><img src="https://files.ban-life.com/content/2020/07/content_body_15959024240.jpg" alt="" /></span>
                    <div className="place-info">
                        <p>카페더왈츠</p>
                        <span>1.5km 이내</span>
                    </div>
                </div>
            </li>

            <li>
                <div>
                    <span className="place-img"><img src="https://files.ban-life.com/content/2020/10/content_body_16031808390.jpg" alt="" /></span>
                    <div className="place-info">
                        <p>꼬리살랑</p>
                        <span>1.5km 이내</span>
                    </div>
                </div>
            </li>
        </PlaceList>
    )
}

export default ListThumbnail

const PlaceList = styled.ul`
    gap: 15px;
    overflow: auto;
    white-space: nowrap;
    margin-top:10px;
    margin-right:-20px;

    li{
        display: inline-block;
        width:140px;
        >div{
            overflow: hidden;
            border-radius: 15px;
            background:var(--white-000);
        }
    }
    li+li{
        margin-left:10px
    }

    .place-img img{
        width:100%;
    }

    .place-info{
        padding:10px 15px 15px;

        p{
            font-weight:600;
            padding-bottom:3px;
        }
        span{
            font-size:12px;
            color:var(--gray-500);
        }
    }
`