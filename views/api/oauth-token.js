const petFinderKey = "veprSzG70WBWfFP1nHZO1UGoaf2kQ5mP6rZJJDK3xi9whQgByh";
const petFinderSecret = "lVG5SCqvPInxXiIOo8sM2Qrek2VoacUAXXkMUTDm";

export default async (req, res) => {
    const params = new URLSearchParams();
    params.append('grant_type', 'Client_Credentials');
    params.append('client_id', petFinderKey);
    params.append('client_secret', petFinderSecret);
    const petfinderRes = await fetch(
        "https://api.petfinder.com/v2/oauth2/token",
        {
            method: "POST",
            body: params
        }
    );
    const data = await petfinderRes.json();
    res.send(data);
};