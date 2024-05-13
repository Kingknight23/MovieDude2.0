const queryString = window.location.search;

// Parse the query string into a URLSearchParams object
const queryParams = new URLSearchParams(queryString);

// Access individual query parameters
const id = queryParams.get('id');
const type = queryParams.get('type');


async function getInfo (id, type)
{
    try {
        response = await fetch(`/getInfo?id=${id}&type=${type}`);
        data = await response.text()

        document.getElementById('info').innerHTML = data;

    }
    catch (err)
    {
        console.err(err)
    }
}

getInfo(id, type)
