const menuButton = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');

function closeMenu() {
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', 'Abrir menu');
    navLinks.classList.remove('open');
    document.body.classList.remove('menu-open');
}

menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    menuButton.setAttribute('aria-label', isOpen ? 'Abrir menu' : 'Fechar menu');
    navLinks.classList.toggle('open');
    document.body.classList.toggle('menu-open');
});

navLinks.addEventListener('click', (event) => {
    if (event.target.matches('a')) closeMenu();
});

const testimonials = {
    margaret: {
        quote: 'Antes eu me preocupava em perder deduções fiscais, mas com a Noble Finances sei que estou maximizando minhas economias.',
        name: 'Margaret L.',
        role: 'Estilista · Austin, Texas',
        image: 'assets/imagens/profile-image-1.png'
    },
    taylor: {
        quote: 'Agora consigo entender meus números e planejar os próximos passos do meu negócio sem aquela sensação de estar perdida.',
        name: 'Taylor M.',
        role: 'Designer gráfico · Ontario, Canadá',
        image: 'assets/imagens/profile-taylor.png'
    },
    markus: {
        quote: 'A equipe organizou minha contabilidade e explicou cada decisão com clareza. Hoje tenho muito mais segurança para crescer.',
        name: 'Markus R.',
        role: 'Fotógrafo comercial · Ontario, Canadá',
        image: 'assets/imagens/profile-markus.png'
    }
};

const testimonialTabs = document.querySelectorAll('.testimonial-tab');
const testimonialQuote = document.querySelector('.testimonial-display blockquote');
const testimonialName = document.querySelector('.testimonial-display cite');
const testimonialRole = document.querySelector('.testimonial-display footer span');
const testimonialImage = document.querySelector('.testimonial-display img');

testimonialTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
        const selected = testimonials[tab.dataset.client];

        testimonialTabs.forEach((item) => {
            const active = item === tab;
            item.classList.toggle('active', active);
            item.setAttribute('aria-selected', String(active));
        });

        testimonialQuote.textContent = `“${selected.quote}”`;
        testimonialName.textContent = selected.name;
        testimonialRole.textContent = selected.role;
        testimonialImage.src = selected.image;
    });
});

const form = document.querySelector('.contact-form');
const feedback = document.querySelector('.form-feedback');

function validateField(field) {
    const wrapper = field.closest('.field');
    const errorMessage = wrapper.querySelector('.error-message');
    let message = '';

    if (field.validity.valueMissing) message = 'Este campo é obrigatório.';
    else if (field.validity.typeMismatch) message = 'Digite um e-mail válido.';
    else if (field.validity.tooShort) message = `Digite pelo menos ${field.minLength} caracteres.`;

    wrapper.classList.toggle('invalid', Boolean(message));
    errorMessage.textContent = message;
    return !message;
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    const fields = [...form.querySelectorAll('input, select')];
    const formIsValid = fields.every(validateField);

    if (!formIsValid) {
        feedback.textContent = 'Revise os campos destacados.';
        form.querySelector('.invalid input, .invalid select')?.focus();
        return;
    }

    feedback.textContent = 'Solicitação registrada! Este formulário é uma demonstração do projeto.';
    form.reset();
});

form.addEventListener('input', (event) => {
    if (event.target.matches('input, select')) validateField(event.target);
});

document.querySelector('#current-year').textContent = new Date().getFullYear();
