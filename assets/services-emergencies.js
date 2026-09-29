(function () {
  'use strict';

  // Verified official sources, 29 September 2026. These are service lines,
  // separate from the general contact numbers of local offices and hospitals.
  const lines = [
    { id: '112', phone: '112', display: '112', source: 'https://112.cantabria.es/' },
    { id: '061', phone: '061', display: '061', group: 'emergency', source: 'https://www.scsalud.es/urgencias-y-emergencias-061' },
    { id: '062', phone: '062', display: '062', group: 'emergency', source: 'https://web.guardiacivil.es/es/colaboracion/atencionciudadano_1/' },
    { id: '091', phone: '091', display: '091', group: 'emergency', source: 'https://www.interior.gob.es/opencms/es/detalle/articulo/La-Policia-Nacional-atendio-mas-de-4.500.000-de-llamadas-al-telefono-091-en-las-salas-CIMACC-de-toda-Espana./' },
    { id: 'sea', phone: '900202202', display: '900 202 202', group: 'emergency', source: 'https://www.salvamentomaritimo.es/conocenos/nuestra-empresa/contacto' },
    { id: '016', phone: '016', display: '016', group: 'support', source: 'https://violenciagenero.igualdad.gob.es/informacion-3/recursos/telefono016/' },
    { id: '024', phone: '024', display: '024', group: 'support', source: 'https://www.sanidad.gob.es/linea024/home.htm' },
    { id: 'poison', phone: '+34915620420', display: '91 562 04 20', group: 'support', source: 'https://www.mjusticia.gob.es/es/institucional/organismos/instituto-nacional/servicios/servicio-informacion/servicio-informacion1' }
  ];
  const allowedNumbers = new Set(['112', '061', '062', '091', '016', '024', '900202202', '+34915620420']);
  function telephone(value) {
    if (typeof value !== 'string') return null;
    const number = value.replace(/[ ().-]/g, '');
    return allowedNumbers.has(number) ? 'tel:' + number : null;
  }
  window.ACOBIJO_EMERGENCY_UTILS = Object.freeze({ telephone });

  const copy = {
    es: {
      title: 'Emergencias', intro: 'Ante una emergencia o peligro inmediato, llama al 112.',
      scope: 'Teléfonos para usar en España.', more: 'Otros teléfonos oficiales',
      emergency: 'Emergencias', support: 'Atención especializada', call: 'Llamar', source: 'Fuente oficial',
      lines: {
        '112': ['Emergencias', 'Asistencia sanitaria, policía, bomberos y rescate.'],
        '061': ['Urgencias sanitarias', 'Atención y orientación sanitaria urgente en Cantabria.'],
        '062': ['Guardia Civil', 'Atención directa de emergencias.'],
        '091': ['Policía Nacional', 'Atención de emergencias policiales.'],
        sea: ['Salvamento Marítimo', 'Emergencias en el mar.'],
        '016': ['Violencia contra las mujeres', 'Información, asesoramiento jurídico y apoyo psicosocial.'],
        '024': ['Atención a la conducta suicida', 'Ayuda a personas en riesgo, familiares y allegados.'],
        poison: ['Información Toxicológica', 'Consultas sobre intoxicaciones y exposición a sustancias tóxicas.']
      }
    },
    en: {
      title: 'Emergencies', intro: 'In an emergency or immediate danger, call 112.',
      scope: 'Phone numbers for use in Spain.', more: 'Other official phone numbers',
      emergency: 'Emergencies', support: 'Specialist support', call: 'Call', source: 'Official source',
      lines: {
        '112': ['Emergencies', 'Medical assistance, police, fire and rescue.'],
        '061': ['Urgent medical assistance', 'Urgent medical help and guidance in Cantabria.'],
        '062': ['Guardia Civil', 'Direct emergency assistance.'],
        '091': ['Policía Nacional', 'Police emergency assistance.'],
        sea: ['Maritime rescue', 'Emergencies at sea.'],
        '016': ['Violence against women', 'Information, legal advice and psychosocial support.'],
        '024': ['Suicide crisis support', 'Help for people at risk, family and loved ones.'],
        poison: ['Poison information', 'Advice on poisoning and exposure to toxic substances.']
      }
    },
    fr: {
      title: 'Urgences', intro: 'En cas d’urgence ou de danger immédiat, appelez le 112.',
      scope: 'Numéros à utiliser en Espagne.', more: 'Autres numéros officiels',
      emergency: 'Urgences', support: 'Aide spécialisée', call: 'Appeler', source: 'Source officielle',
      lines: {
        '112': ['Urgences', 'Aide médicale, police, pompiers et secours.'],
        '061': ['Urgences médicales', 'Aide et orientation médicales urgentes en Cantabrie.'],
        '062': ['Guardia Civil', 'Assistance directe en cas d’urgence.'],
        '091': ['Policía Nacional', 'Urgences nécessitant une intervention policière.'],
        sea: ['Sauvetage maritime', 'Urgences en mer.'],
        '016': ['Violences faites aux femmes', 'Information, conseil juridique et soutien psychosocial.'],
        '024': ['Prévention du suicide', 'Aide aux personnes à risque, à leur famille et à leurs proches.'],
        poison: ['Information antipoison', 'Conseils sur les intoxications et l’exposition à des substances toxiques.']
      }
    },
    de: {
      title: 'Notfälle', intro: 'Bei einem Notfall oder unmittelbarer Gefahr wählen Sie 112.',
      scope: 'Telefonnummern zur Nutzung in Spanien.', more: 'Weitere offizielle Telefonnummern',
      emergency: 'Notrufe', support: 'Spezialisierte Beratung', call: 'Anrufen', source: 'Offizielle Quelle',
      lines: {
        '112': ['Notfälle', 'Medizinische Hilfe, Polizei, Feuerwehr und Rettungsdienste.'],
        '061': ['Medizinischer Notruf', 'Dringende medizinische Hilfe und Beratung in Kantabrien.'],
        '062': ['Guardia Civil', 'Direkte Hilfe bei Notfällen.'],
        '091': ['Policía Nacional', 'Hilfe bei polizeilichen Notfällen.'],
        sea: ['Seenotrettung', 'Notfälle auf See.'],
        '016': ['Gewalt gegen Frauen', 'Informationen, Rechtsberatung und psychosoziale Unterstützung.'],
        '024': ['Hilfe bei Suizidgefahr', 'Hilfe für gefährdete Menschen, Angehörige und Nahestehende.'],
        poison: ['Giftinformation', 'Beratung bei Vergiftungen und Kontakt mit giftigen Stoffen.']
      }
    },
    nl: {
      title: 'Noodgevallen', intro: 'Bel 112 bij een noodgeval of direct gevaar.',
      scope: 'Telefoonnummers voor gebruik in Spanje.', more: 'Andere officiële telefoonnummers',
      emergency: 'Noodgevallen', support: 'Gespecialiseerde hulp', call: 'Bellen', source: 'Officiële bron',
      lines: {
        '112': ['Noodgevallen', 'Medische hulp, politie, brandweer en reddingsdiensten.'],
        '061': ['Medische spoedhulp', 'Dringende medische hulp en advies in Cantabrië.'],
        '062': ['Guardia Civil', 'Directe hulp bij noodgevallen.'],
        '091': ['Policía Nacional', 'Spoedeisende politiehulp.'],
        sea: ['Redding op zee', 'Noodgevallen op zee.'],
        '016': ['Geweld tegen vrouwen', 'Informatie, juridisch advies en psychosociale ondersteuning.'],
        '024': ['Hulp bij suïcidegedachten', 'Hulp voor mensen die risico lopen, familie en naasten.'],
        poison: ['Informatie over vergiftiging', 'Advies bij vergiftiging en blootstelling aan giftige stoffen.']
      }
    }
  };

  function initialize() {
    const container = document.getElementById('contactEmergencies');
    if (!container) return;
    const bindings = [];
    function element(tag, className) {
      const node = document.createElement(tag);
      if (className) node.className = className;
      return node;
    }
    function label(tag, key, className) {
      const node = element(tag, className);
      bindings.push(t => { node.textContent = t[key]; });
      return node;
    }
    function sourceLink(line) {
      const link = element('a', 'emergency-source');
      link.href = line.source;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      bindings.push(t => {
        link.textContent = t.source + ' ↗';
        link.setAttribute('aria-label', t.source + ' · ' + t.lines[line.id][0]);
      });
      return link;
    }
    function callLink(line, prominent) {
      const link = element('a', prominent ? 'emergency-call emergency-call-primary' : 'emergency-call');
      link.href = telephone(line.phone);
      bindings.push(t => {
        link.textContent = prominent ? t.call + ' · ' + line.display : line.display;
        link.setAttribute('aria-label', t.call + ' · ' + t.lines[line.id][0] + ' · ' + line.display);
      });
      return link;
    }
    function description(line) {
      const p = element('p', 'emergency-description');
      bindings.push(t => { p.textContent = t.lines[line.id][1]; });
      return p;
    }

    container.classList.add('contact-emergencies');
    container.setAttribute('aria-labelledby', 'contactEmergenciesTitle');
    const primary = element('div', 'emergency-primary');
    const primaryText = element('div', 'emergency-primary-text');
    const title = label('h3', 'title');
    title.id = 'contactEmergenciesTitle';
    primaryText.append(title, label('p', 'intro', 'emergency-intro'), description(lines[0]));
    const primaryActions = element('div', 'emergency-primary-actions');
    primaryActions.append(callLink(lines[0], true), sourceLink(lines[0]));
    primary.append(primaryText, primaryActions);

    const details = element('details', 'emergency-details');
    details.append(label('summary', 'more'));
    const groups = element('div', 'emergency-groups');
    for (const group of ['emergency', 'support']) {
      const section = element('section', 'emergency-group');
      const heading = label('h4', group);
      heading.id = 'contactEmergencies-' + group;
      section.setAttribute('aria-labelledby', heading.id);
      const grid = element('div', 'emergency-grid');
      for (const line of lines.filter(item => item.group === group)) {
        const card = element('article', 'emergency-number-card');
        const name = element('h5');
        bindings.push(t => { name.textContent = t.lines[line.id][0]; });
        const actions = element('div', 'emergency-number-actions');
        actions.append(callLink(line, false), sourceLink(line));
        card.append(name, description(line), actions);
        grid.append(card);
      }
      section.append(heading, grid);
      groups.append(section);
    }
    details.append(groups);
    container.replaceChildren(primary, label('p', 'scope', 'emergency-scope'), details);
    function translate() {
      const language = (document.documentElement.lang || 'es').slice(0, 2).toLowerCase();
      const t = Object.hasOwn(copy, language) ? copy[language] : copy.es;
      bindings.forEach(update => update(t));
    }
    document.addEventListener('acobijo:language', translate);
    translate();
  }
  // The host applies its saved language during DOMContentLoaded. A deferred
  // script also needs to wait while readyState is still "interactive".
  if (document.readyState !== 'complete') {
    document.addEventListener('DOMContentLoaded', initialize, { once: true });
  } else {
    initialize();
  }
})();
