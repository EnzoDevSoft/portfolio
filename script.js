// Seleciona o checkbox do botão de alternância e o corpo da página
const themeToggle = document.getElementById("theme-toggle");
const body = document.body;

// Verifica se há um tema salvo no armazenamento local
const savedTheme = localStorage.getItem("theme");

// Aplica o tema salvo ao carregar a página
if (savedTheme === "dark") {
  body.classList.add("dark-mode");
  themeToggle.checked = true; // Define o botão como ativado
} else if (savedTheme === "light") {
  body.classList.add("light-mode");
}

// Alterna entre os modos claro e escuro ao clicar no botão
themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    body.classList.remove("light-mode");
    body.classList.add("dark-mode");
    localStorage.setItem("theme", "dark"); // Salva o tema escuro no armazenamento local
  } else {
    body.classList.remove("dark-mode");
    body.classList.add("light-mode");
    localStorage.setItem("theme", "light"); // Salva o tema claro no armazenamento local
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const toggleSwitch = document.querySelector(".toggle-switch");
  // Adiciona a classe "show" para ativar a animação
  setTimeout(() => {
    toggleSwitch.classList.add("show");
  }, 200); // Atraso opcional para maior suavidade
});

// CARDS

document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animated");
  const sectionTitle = document.querySelector(".titulo");

  let isVisible = false; // Controle para evitar reexecuções desnecessárias

  const handleScroll = () => {
    const triggerPoint = window.innerHeight / 2; // Ajuste para ativar próximo ao meio da tela
    const sectionTop = sectionTitle.getBoundingClientRect().top;

    // Mostrar ou ocultar baseado na posição
    if (sectionTop < triggerPoint && sectionTop >= 0 && !isVisible) {
      toggleVisibility(true);
    } else if ((sectionTop >= triggerPoint || sectionTop < 0) && isVisible) {
      toggleVisibility(false);
    }
  };

  // Função para mostrar/ocultar elementos
  const toggleVisibility = (show) => {
    isVisible = show;
    animatedElements.forEach((el) => el.classList.toggle("show", show));
    sectionTitle.classList.toggle("show", show);
  };

  // Escutador de scroll
  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Executa ao carregar
});

// MODAL

// Seleciona os elementos principais
const modal = document.getElementById("modal");
const closeModal = document.querySelector(".modal-close");
const projectButtons = document.querySelectorAll(".project button");
const interfaceContent = document.querySelector(".interface"); // Seleciona o conteúdo do site

// Função para abrir o modal
const openModal = () => {
  modal.style.display = "flex"; // Exibe o modal
  interfaceContent.classList.add("blur-active"); // Aplica o desfoque no fundo
  document.body.style.overflow = "hidden"; // Desabilita o scroll
};

// Função para fechar o modal
const hideModal = () => {
  modal.style.display = "none"; // Oculta o modal
  interfaceContent.classList.remove("blur-active"); // Remove o desfoque do fundo
  document.body.style.overflow = "auto"; // Habilita o scroll
};

// Adiciona evento de clique nos botões dos projetos
projectButtons.forEach((button) => {
  button.addEventListener("click", openModal);
});

// Adiciona evento de clique no botão de fechar
closeModal.addEventListener("click", hideModal);

// Fecha o modal ao clicar fora dele
window.addEventListener("click", (event) => {
  if (event.target === modal) {
    hideModal();
  }
});

// Função que será chamada quando o elemento entrar na tela
const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Quando o elemento entra na tela, adiciona a classe 'show'
        entry.target.classList.add("show");
      } else {
        // Quando o elemento sai da tela, remove a classe 'show'
        entry.target.classList.remove("show");
      }
    });
  },
  { threshold: 0.5 }
); // Define que o elemento deve estar 50% visível para ser considerado visível

// Seleciona todos os títulos, subtítulos e projetos e começa a observar
document
  .querySelectorAll(".titulo-container, .subtitle, .project")
  .forEach((element) => {
    observer.observe(element);
  });

// ANIMAÇÃO SEÇÃO PROJETOS

document.addEventListener("DOMContentLoaded", function () {
  const portfolioSection = document.querySelector(".portfolio"); // Seleciona a seção de projetos
  const animatedElements = portfolioSection.querySelectorAll(".animated"); // Seleciona apenas os elementos animados dentro da seção

  function handleScroll() {
    const sectionTop = portfolioSection.getBoundingClientRect().top;
    const windowHeight = window.innerHeight * 0.85; // Ativa antes do meio da tela

    if (sectionTop < windowHeight) {
      portfolioSection.classList.remove("hidden"); // Garante que a seção fique visível
      animatedElements.forEach((element) => {
        const elementTop = element.getBoundingClientRect().top;
        if (elementTop < windowHeight) {
          element.classList.add("show"); // Ativa a animação
        } else {
          element.classList.remove("show"); // Remove para reanimar ao rolar
        }
      });
    }
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll(); // Executa ao carregar a página
});

// ANIMAÇÃO SEÇÃO CONTATOS

document.addEventListener("DOMContentLoaded", () => {
  const animatedElementsContato = document.querySelectorAll(
    ".animated-group-contato"
  );
  let lastScrollY = window.scrollY;

  const handleScrollContato = () => {
    const triggerPoint = window.innerHeight / 1.5; // Ajusta para o meio da página
    const currentScrollY = window.scrollY;

    animatedElementsContato.forEach((el) => {
      const rect = el.getBoundingClientRect();
      const isBelow = rect.top > window.innerHeight / 1.9; // Elemento saiu da tela
      const isVisible = rect.top < triggerPoint && rect.bottom >= 0;

      // Adiciona a animação ao descer e elemento visível
      if (currentScrollY > lastScrollY && isVisible) {
        el.classList.add("show");
      }

      // Remove a animação ao subir e elemento sair da tela
      if (currentScrollY < lastScrollY && isBelow) {
        el.classList.remove("show");
      }
    });

    lastScrollY = currentScrollY; // Atualiza o valor do último scroll
  };

  // Escutador de scroll
  window.addEventListener("scroll", handleScrollContato);

  // Executa ao carregar a página
  handleScrollContato();
});





