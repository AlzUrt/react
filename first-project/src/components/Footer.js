function Footer() {
    const date = new Date();

    return (
        <div className="fixed-bottom mb-2">
            <p>Créé par moi même en { date.toDateString() }</p>
        </div>
    );
}

export default Footer;