import { getImages } from "../../utils/getImages";
import { Title, Cotainer } from "./styles";

function Credtis({ credtis }) {
    return (
        <>
            <Title>Crditos</Title>
            {credtis && (
                <Cotainer>
                    {credtis.slice(0, 5).map((artist) => (
                        <div key={artist.id}>
                            <img src={getImages(artist.profile_path)} />
                            <p>{artist.original_name}</p>
                        </div>
                    ))}
                    <div></div>
                </Cotainer>
            )}
        </>
    )



}

export default Credtis;