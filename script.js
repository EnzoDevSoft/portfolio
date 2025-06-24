document.addEventListener("DOMContentLoaded", () => {
  // === LÓGICA DO TEMA CLARO/ESCURO ===
  const themeToggle = document.getElementById("theme-toggle");
  const body = document.body;
  
  if (localStorage.getItem("theme") === "light") {
    body.classList.add("light-mode");
    themeToggle.checked = false;
  } else {
    body.classList.remove("light-mode");
    themeToggle.checked = true;
  }

  themeToggle.addEventListener("change", () => {
    body.classList.toggle("light-mode");
    localStorage.setItem("theme", body.classList.contains("light-mode") ? "light" : "dark");
  });

  // === LÓGICA DO MENU HAMBÚRGUER ===
  const hamburguerMenu = document.querySelector('.hamburguer-menu');
  const mobileNavLinks = document.querySelector('.mobile-nav-links');
  const allMobileLinks = mobileNavLinks.querySelectorAll('a');
  
  const toggleMenu = () => {
    hamburguerMenu.classList.toggle('active');
    mobileNavLinks.classList.toggle('active');
    document.body.style.overflow = mobileNavLinks.classList.contains('active') ? 'hidden' : 'auto';
  };

  hamburguerMenu.addEventListener('click', toggleMenu);
  allMobileLinks.forEach(link => link.addEventListener('click', toggleMenu));

  // === ANIMAÇÕES DE SCROLL OTIMIZADAS ===
  const animatedElements = document.querySelectorAll('.animated');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  
  animatedElements.forEach(el => observer.observe(el));

  // === LÓGICA DO MODAL ===
  const modal = document.getElementById("modal");
  const closeModalBtn = document.querySelector(".modal-close");
  const projectButtons = document.querySelectorAll(".project-card");
  const pageContent = document.getElementById("page-content");
  const modalTitle = document.querySelector(".modal-title");
  const modalDescription = document.querySelector(".modal-description");
  const modalTechnologiesContainer = document.querySelector(".modal-technologies-container");
  const modalDate = document.querySelector(".modal-date");
  const modalVideo = document.querySelector(".video");
  const modalVideoSource = modalVideo ? modalVideo.querySelector("source") : null;
  const modalDeployLink = document.getElementById("deploy-link");
  const modalGithubLink = document.getElementById("github-link");
  const modalLinkedinLink = document.getElementById("linkedin-link");
  
  const projectData = {
    proj1: {
      title: "Coração Animal - Plataforma de Apoio",
      description: "Este projeto foi desenvolvido como um exercício prático para testar e aprimorar minhas habilidades em Front-End, com foco em design responsivo, interação do usuário e propósito social. Mais do que apenas um desafio técnico, esta aplicação nasceu da minha preocupação com a preservação da vida selvagem e a crescente ameaça de extinção de diversas espécies ao redor do mundo. Além de funcionar como um espaço educativo, o projeto também tem um viés de ação prática: um botão “Doar” estrategicamente posicionado. Permite que visitantes engajados com a causa contribuam diretamente com instituições e movimentos sérios que trabalham em prol da fauna ameaçada. A intenção por trás desse botão não é apenas promover a doação, mas também criar um canal de conexão entre quem quer ajudar e quem está na linha de frente da proteção ambiental.",
      technologies: ["HTML5", "CC3 / SASS", "JavaScript"],
      date: "15/01/2024",
      video: "videos/coracao.mp4",
      deploy: "#",
      github: "#",
      linkedin: "#"
    },
    proj2: {
      title: "Sala 3D Imersiva - Arte e Gameplay",
      description: "Este projeto foi idealizado como uma prática pessoal para explorar e consolidar meus conhecimentos em desenvolvimento Front-End, especialmente no que diz respeito à renderização 3D em ambiente web. Busquei criar uma experiência visual imersiva e única, unindo elementos que me inspiram e que fazem parte do meu universo pessoal, como personagens icônicos e cenas de gameplay. Um dos grandes diferenciais da sala são os quadros digitais posicionados nas paredes, exibindo personagens que admiro profundamente. Além disso, inseri uma gameplay em looping contínuo, transmitida em uma TV do ambiente. Esse detalhe contribui para o clima imersivo, transmitindo a sensação de que o usuário está em um espaço onde a tecnologia e a paixão por jogos se encontram em harmonia.",
      technologies: ["JavaScript", "Three.js", "HTML5", "CSS3"],
      date: "20/02/2024",
      video: "videos/sala3d.mp4",
      deploy: "#",
      github: "#",
      linkedin: "#"
    },
    proj3: {
      title: "Clone do Spotify - Aplicação Full-Stack",
      description: "Este projeto foi desenvolvido como parte dos meus estudos no curso da Hashtag Programação, com o objetivo de me aprofundar nas tecnologias do universo Full-Stack. Inspirado na interface e na usabilidade do Spotify, criei um clone funcional da plataforma, com foco na experiência do usuário, design moderno, manipulação de dados e estruturação de um sistema completo, tanto no Front-End quanto no Back-End. Desde o início, encarei este projeto como uma oportunidade de testar minha capacidade de construir uma aplicação robusta, que vai além da interface visual, alcançando também o funcionamento interno da aplicação – como o controle das músicas, navegação entre faixas, simulação de usuários e início da estrutura de banco de dados. Porém, ainda não terminei o restante para poder reproduzir as faixas de música.",
      technologies: ["React", "MongoDB", "SASS"],
      date: "20/12/2023",
      video: "videos/fullstack.mp4",
      deploy: "#",
      github: "#",
      linkedin: "#"
    },
    proj4: {
      title: "Barcarollo",
      description: "Este projeto foi desenvolvido com o objetivo de testar e refinar minhas habilidades como desenvolvedor Front-End, unindo estética sofisticada, boa estrutura de código e uma experiência visual envolvente. O conceito do projeto gira em torno de um restaurante italiano fictício de alto padrão, chamado Barcarollo, com uma proposta moderna, elegante e focada na valorização visual dos pratos. Mais do que apenas um exercício técnico, essa aplicação foi pensada como um exemplo de como o design digital pode traduzir sensações físicas, como sabor, aroma e ambiente. A missão foi criar um site com um visual extremamente limpo, organizado e intuitivo, onde a simplicidade do design evidenciasse a beleza dos pratos e transmitisse a identidade refinada de um restaurante italiano autêntico.",
      technologies: ["HTML5", "Sass", "JavaScript"],
      date: "05/03/2024",
      video: "videos/barcarollo.mp4",
      deploy: "#",
      github: "#",
      linkedin: "#"
    },
    proj5: {
      title: "Login 3D - Imersão Visual",
      description: "Este projeto foi criado com a proposta de romper com o padrão tradicional de páginas de login e oferecer uma experiência visual diferenciada. A ideia nasceu como um desafio pessoal para testar minhas habilidades com manipulação de elementos tridimensionais, interações dinâmicas e usabilidade, dentro de um contexto real de sistema de autenticação. Ao desenvolver essa tela, busquei explorar como a profundidade, os movimentos e os efeitos de perspectiva podem influenciar positivamente a experiência do usuário, sem comprometer a clareza e a funcionalidade.",
      technologies: ["HTML5", "CSS3", "JavaScript"],
      date: "10/03/2024",
      video: "videos/login3d.mp4",
      deploy: "#",
      github: "#",
      linkedin: "#"
    },
    proj6: {
      title: "Clone Microsoft",
      description: "Este projeto foi desenvolvido com o propósito de recriar com o máximo de fidelidade o site oficial da Microsoft, utilizando apenas tecnologias de Front-End. O desafio era simular a navegação, o estilo visual e a arquitetura de um dos maiores sites corporativos do mundo, com o objetivo de testar meu nível de atenção aos detalhes, organização de layout e domínio de estilização responsiva. Ao longo da criação, busquei me aproximar o máximo possível da identidade visual da marca, recriando seções como menus superiores, banners interativos, carrosséis de produtos, destaques e rodapé institucional — sempre com um olhar atento à coerência visual, alinhamento e comportamento dos elementos em diferentes tamanhos de tela.",
      technologies: ["HTML5", "CSS3"],
      date: "18/03/2024",
      video: "videos/microsoft.mp4",
      deploy: "#",
      github: "#",
      linkedin: "#"
    },
    proj7: {
        title: "Clone Spotify - Imersão Alura",
        description: "Este projeto foi desenvolvido durante uma imersão intensiva promovida pela Alura, com o objetivo de recriar, passo a passo, um clone da plataforma Spotify, utilizando tecnologias fundamentais do desenvolvimento Front-End. Com uma carga horária de 11 horas de aprendizado prático, o curso proporcionou uma experiência rica e desafiadora, na qual pude aplicar diversos conceitos ao mesmo tempo em que assimilava novos conhecimentos. A proposta central era construir uma interface de player de música com estrutura semelhante ao Spotify, mas com espaço para customizações visuais, permitindo também desenvolver uma versão com estilo um pouco diferente da original — algo que me deu liberdade para explorar e experimentar minha criatividade, mesmo dentro do conteúdo guiado.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        date: "25/03/2024",
        video: "videos/alura.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj8: {
        title: "Estilo House",
        description: "O principal objetivo foi criar um protótipo funcional de loja online, aplicando lógica com JavaScript para controlar produtos, criar e editar carrinhos de compra, além de desenvolver telas de login e registro. Busquei, ao longo do processo, garantir que tudo estivesse bem segmentado: visual, interações, fluxo de usuário e organização geral da página. Este projeto também serviu para reforçar minhas habilidades em controle de estado no Front-End, manipulação de DOM e implementação de funcionalidades práticas que fazem parte do dia a dia de uma aplicação de vendas.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        date: "02/04/2024",
        video: "videos/estilohouse.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj9: {
        title: "Clone Spotify - Web",
        description: "Este projeto representa uma versão mais simples e web básica de um clone do Spotify, criada com o objetivo de experimentar ideias de estrutura e layout de forma leve, rápida e direta ao ponto. Mesmo não tendo sido finalizado, o processo de construção foi extremamente proveitoso, pois me permitiu reforçar fundamentos da construção de páginas web estáticas, testar elementos visuais e funcionais inspirados na plataforma original, além de explorar o conceito de modularização visual em uma interface mais enxuta. A proposta foi desenvolver uma versão compacta e funcional, ideal para testar rapidamente estruturas de navegação, organização de sessões musicais e elementos do player, sem necessariamente adicionar lógicas complexas ou interações avançadas neste momento.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        date: "10/04/2024",
        video: "videos/macdemarco.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj10: {
        title: "Universo Marvel 3D",
        description: "Este projeto foi desenvolvido com o objetivo de treinar e expandir minhas habilidades em aplicações com elementos 3D, aliando recursos gráficos interativos com estrutura web. A ideia central foi construir uma galeria de personagens da Marvel com efeito tridimensional, oferecendo uma experiência visual mais imersiva para o usuário. A iniciativa surgiu a partir de uma atividade proposta no curso de Análise e Desenvolvimento de Sistemas, como forma de aplicar conteúdos vistos em aula, especialmente voltados para o desenvolvimento Front-End com integração de elementos 3D. Mesmo sendo um projeto com proposta básica, ele teve grande valor prático, pois me proporcionou contato direto com conceitos de modelagem, perspectiva e interatividade visual, além de consolidar noções fundamentais de composição gráfica no ambiente web.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        date: "15/04/2024",
        video: "videos/marvel3d.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj11: {
        title: "Vingadores - Slider",
        description: "Este projeto foi desenvolvido com o objetivo de exibir de forma dinâmica e visualmente agradável os principais personagens dos Vingadores, utilizando sliders bem elaborados, com um design limpo e responsivo, que prioriza tanto a estética quanto o desempenho. A proposta foi construir uma interface fluida e moderna, na qual o usuário pudesse navegar entre os heróis favoritos da equipe Vingadores, com transições suaves, sem comprometer a leveza e a performance do site.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        date: "20/04/2024",
        video: "videos/vingadores.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj12: {
        title: "Página de Login",
        description: "Este projeto foi um dos primeiros desenvolvidos durante o início da minha jornada no Front-End. Trata-se de uma página de login com design intuitivo, leve e funcional, construída inteiramente com HTML5 e CSS3, sem uso de JavaScript. Mesmo sendo um projeto simples, foi uma experiência extremamente valiosa, pois me permitiu aprender na prática como organizar, estilizar e estruturar uma interface de forma eficaz. O objetivo era criar uma tela de acesso visualmente agradável, que demonstrasse bons princípios de design e usabilidade, mesmo sem funcionalidades dinâmicas ou conexão com banco de dados.",
        technologies: ["HTML5","CSS3"],
        date: "22/04/2024",
        video: "videos/login.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj13: {
        title: "Lua 3D",
        description: "Este projeto foi desenvolvido como parte de uma aula prática durante um curso de Front-End, e teve como objetivo central reproduzir uma lua em 3D com realismo visual e interação fluida. A proposta era aplicar conceitos visuais avançados, explorando profundidade, texturas e movimento em tempo real, mesmo dentro do contexto de um ambiente web leve e responsivo. A experiência foi extremamente enriquecedora, pois me permitiu trabalhar com elementos gráficos tridimensionais, algo que exige atenção aos detalhes e um bom domínio de estruturação e estilização em camadas.",
        technologies: ["HTML5","CSS3 / SASS","JavaScript"],
        date: "28/04/2024",
        video: "assets/video-placeholder.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj14: {
        title: "Barbearia - Landing Page",
        description: "Este projeto foi desenvolvido durante uma aula prática de Front-End, ainda no início da minha jornada de estudos, com o objetivo de criar uma Landing Page moderna, funcional e intuitiva para uma barbearia. A proposta era proporcionar aos clientes uma experiência fluida e direta, desde a apresentação dos serviços até o agendamento de um horário para atendimento. A página foi idealizada para refletir o profissionalismo do negócio e facilitar o acesso dos clientes aos principais serviços oferecidos, além de integrar informações essenciais como localização, valores e um botão de ação rápida. Foi um dos meus primeiros projetos que combinou design limpo com funcionalidade real, e foi fundamental para solidificar meus conhecimentos iniciais em estruturação e estilização web.",
        technologies: ["HTML5", "CSS3", "SASS"],
        date: "02/05/2024",
        video: "assets/video-placeholder.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj15: {
        title: "Background Animado",
        description: "Este projeto foi realizado com o objetivo de explorar novas possibilidades de interatividade visual e animações no Front-End, tendo como base um tutorial que encontrei no YouTube. A ideia principal era criar um background animado, dinâmico e customizável, servindo como base para páginas criativas ou seções visuais de alto impacto. Apesar de não ser um projeto completo com funcionalidades comerciais, ele teve grande valor técnico e criativo, pois me permitiu experimentar animações mais avançadas, manipulação visual em tempo real e entender os limites de performance que esse tipo de elemento pode gerar dentro de um site.",
        technologies: ["HTML5","CSS3","JavaScript"],
        date: "05/05/2024",
        video: "assets/video-placeholder.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj16: {
        title: "Terra 3D",
        description: "Este projeto foi desenvolvido com o intuito de aprimorar minhas habilidades em ambientes 3D, explorando conceitos de movimentação, imersão e ambientação em projetos Front-End. Assim como o projeto da Lua 3D que fiz anteriormente, este trabalho teve uma proposta parecida, mas com uma abordagem mais rica e simbólica, representando o planeta Terra cercado por elementos naturais e aviões em movimento, criando uma atmosfera visual impactante e cheia de vida. O foco principal foi construir uma experiência visual única, que conectasse tecnologia e natureza, transmitindo movimento e equilíbrio em uma representação tridimensional. Foi um exercício excelente para aprofundar meus conhecimentos em manipulação 3D no navegador, tanto no aspecto técnico quanto artístico.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        date: "10/05/2024",
        video: "videos/terra3d.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj17: {
        title: "Los Angeles - Landing Page",
        description: "Este projeto foi desenvolvido nos primeiros passos da minha jornada como desenvolvedor Front-End. A proposta era criar uma Landing Page visualmente atraente e bem estruturada, com o objetivo de apresentar e destacar os principais pontos turísticos e características culturais da cidade de Los Angeles. Além de servir como uma prática técnica, o projeto também foi uma forma de explorar o conceito de design voltado para turismo e promoção de destinos urbanos.",
        technologies: ["HTML5"],
        date: "15/05/2024",
        video: "videos/losangeles.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj18: {
        title: "Carrossel - Ilustrativo",
        description: "Este projeto foi idealizado com o objetivo de explorar diferentes culturas ao redor do mundo através de imagens e palavras inspiradoras. Desenvolvi um carrossel interativo com foco visual e cultural, que exibe fotos ilustrativas de diversos países – como China, Islândia, EUA, entre outros acompanhadas de frases reflexivas e poéticas de escritores renomados que, de alguma forma, capturam a essência de cada nação apresentada.",
        technologies: ["HTML5", "CSS3 / Stylus"],
        date: "20/05/2024",
        video: "videos/carrossel.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj19: {
        title: "Carta 3D - Interativa",
        description: "Este projeto foi desenvolvido com base em um tutorial americano do YouTube, com o objetivo de praticar novas técnicas em manipulação de objetos 3D e interatividade dentro do navegador. A proposta era criar uma interface em formato de carta ou janela, com uma caveira tridimensional central como elemento principal, permitindo ao usuário girá-la em diferentes ângulos e customizar suas cores conforme desejasse. Mais do que apenas seguir um tutorial, esta prática foi uma oportunidade para mergulhar em conceitos avançados de Front-End interativo, principalmente na parte visual e gráfica, elevando meu entendimento sobre como criar elementos tridimensionais atrativos e dinâmicos.",
        technologies: ["HTML5","CSS3","JavaScript"],
        date: "25/05/2024",
        video: "assets/video-placeholder.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj20: {
        title: "Game Tower - Construção de Torres",
        description: "O Game Tower, é um projeto que desenvolvi em colaboração com colegas de curso, com o objetivo de aplicar na prática os conhecimentos adquiridos em programação e desenvolvimento de jogos durante nossa formação. O foco foi criar um jogo leve, viciante e acessível, ideal para usuários que desejam se entreter de forma rápida e divertida, enquanto tentam bater seus próprios recordes na construção de torres. Essa experiência em grupo proporcionou uma imersão completa no processo de desenvolvimento de um jogo, desde o planejamento e definição de mecânicas até a divisão de tarefas e execução em equipe, reforçando habilidades técnicas e de trabalho colaborativo.",
        technologies: ["HTML5", "CSS3 / SASS", "TypeScript"],
        date: "30/05/2024",
        video: "videos/gametower.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj21: {
        title: "Velozz",
        description: "Este projeto foi desenvolvido com o objetivo de praticar e evoluir minhas habilidades em desenvolvimento Front-End, criando uma plataforma simulada de aluguel de veículos com uma experiência de navegação fluida, moderna e responsiva. O site permite que os usuários escolham entre carros esportivos de alto desempenho, veículos off-road para aventuras ou passeios personalizados com condutores especializados, adequando-se a diferentes estilos de público. O diferencial do projeto está na flexibilidade: o cliente pode optar por alugar o veículo por dias, semanas ou meses, ou ainda contratar um passeio completo, com roteiros e experiências planejadas — seja em estradas urbanas, trilhas, montanhas ou litoral.",
        technologies: ["HTML5", "CSS3", "JavaScript"],
        date: "10/04/2024", 
        video: "videos/cars.mp4",
        deploy: "#",
        github: "#",
        linkedin: "#"
    },
    proj22: { 
      title: "FP Sellection", 
      description: "Este projeto foi realizado durante o início da minha jornada como desenvolvedor Front-End. O objetivo era criar um e-commerce com uma identidade visual moderna e sofisticada, focada em artigos esportivos de alta qualidade. A inspiração veio da necessidade de aplicar, na prática, conceitos de design e usabilidade em uma plataforma de vendas online. Um dos principais desafios foi desenvolver uma experiência de compra que fosse, ao mesmo tempo, intuitiva e visualmente atraente. Desde a organização dos produtos até o design dos botões e a fluidez da navegação, cada detalhe foi pensado para transmitir profissionalismo e confiança, incentivando o usuário a explorar as coleções e a interagir com a plataforma.", 
      technologies: ["HTML5", "CSS3", "JavaScript"], 
      date: "22/10/2024", 
      video: "videos/sport.mp4", 
      deploy: "https://fp-selle.vercel.app/", 
      github: "https://github.com/EnzoDevSoft/FP-Selle", 
      linkedin: "https://www.linkedin.com/feed/update/urn:li:activity:7342674607264432128/" 
    },
  };

  const openModal = (event) => {
    const card = event.currentTarget;
    const projectId = card.getAttribute("data-project");
    const data = projectData[projectId];
    if (!data) return;

    // 1. Limpa o vídeo anterior e reseta o poster
    if (modalVideoSource) {
      modalVideoSource.src = "";
    }
    modalVideo.poster = "assets-portfólio/poster-placeholder.jpg";
    modalVideo.load();

    // 2. Preenche todas as informações de texto
    modalTitle.textContent = data.title;
    modalDescription.textContent = data.description;
    modalDate.textContent = `Data: ${data.date}`;
    
    modalTechnologiesContainer.innerHTML = '';
    if (data.technologies && data.technologies.length > 0) {
      const techTitle = document.createElement('h4');
      techTitle.textContent = 'Tecnologias Utilizadas';
      techTitle.className = 'technologies-title';
      modalTechnologiesContainer.appendChild(techTitle);
      
      data.technologies.forEach(techName => {
        const techTag = document.createElement('span');
        techTag.className = 'tech-tag';
        techTag.textContent = techName;
        modalTechnologiesContainer.appendChild(techTag);
      });
    }
    
    modalDeployLink.href = data.deploy;
    modalGithubLink.href = data.github;
    modalLinkedinLink.href = data.linkedin;

    // 3. Mostra o modal e inicia a sua animação de fade
    modal.classList.add("active");
    pageContent.classList.add("blur-active");
    document.body.style.overflow = "hidden";

    // 4. A MÁGICA: Escuta pelo fim da animação do modal
    function loadVideoOnTransitionEnd(event) {
      // Garante que estamos ouvindo o evento certo no elemento certo
      if (event.target === modal && event.propertyName === 'opacity') {
        console.log("Animação do modal terminada. Carregando vídeo...");
        if (modalVideoSource && data.video) {
          modalVideoSource.src = data.video;
          modalVideo.load();
        }
        // IMPORTANTE: Remove o listener para não ser executado novamente
        modal.removeEventListener('transitionend', loadVideoOnTransitionEnd);
      }
    }
    
    // Adiciona o listener que vai chamar a função acima QUANDO a transição acabar
    modal.addEventListener('transitionend', loadVideoOnTransitionEnd);
  };

  const hideModal = () => {
    modal.classList.remove("active");
    pageContent.classList.remove("blur-active");
    document.body.style.overflow = "auto";
    if (modalVideo) {
      // Para o vídeo e reseta
      modalVideo.pause();
      modalVideo.currentTime = 0;
      // Interrompe qualquer download e libera memória de vídeo
      if (modalVideoSource) {
        modalVideoSource.src = "";
      }
    }
  };

  // Conecta os botões às funções
  projectButtons.forEach(button => button.addEventListener('click', openModal));
  closeModalBtn.addEventListener('click', hideModal);
  modal.addEventListener('click', (event) => {
    if (event.target === modal) {
      hideModal();
    }
  });

});