% Definiera alla konstanter
% Sätter igång snurran
F = 2;             % Kraften som appliceras
delta_t = 0.1;     % Tiden under vilken en kraft appliceras

% Snurrans egenskaper
mass = 0.1;                 % Snurrans massa
r = 0.02;                   % Snurrans radie (längst upp)
height = 0.07;                   % Snurrans höjd
com = 3 * height / 4;       % Avståndet till masscentrum
g = 9.82;                   % Gravitationskonstanten


% Trögehtsmoment för snurran
Inertia = (3*mass*r*r)/10;
                  
% Beräkna psi_dot
psi_dot = F*r*delta_t/Inertia;

% Beräkna phi_dot
phi_dot = mass*g*com/(psi_dot*Inertia);


h= 1 / 60; % Steglängd (för motivering se kommentarer i den implementerade koden)
N=1000; % Antal steg

% Startvärden för psi och phi
psi(1) = 0;
phi(1) = 0;

% For-loop för att beräkna allt möjligt med hjälp av Eulers stegmetod
for n=1:N
    
    psi(n+1) = Euler(psi(n), psi_dot, h);
    phi(n+1) = Euler(phi(n), phi_dot, h);
    
end

% Plotta resultaten från loopen ovan.
t = 0:h:h*N;
plot(t,mod(psi,2*pi),'r');
title('Psi');
figure;
plot(t,mod(phi,2*pi),'r');
title('Phi');

% Koden nedan visar snurrans rotation, den inre cirkeln är rotationen runt
% snurrans egen axel, den yttre cirkeln är precessionen.
% Denna kod gör tyvärr att figurerna för psi och phi inte visas, så man bör
% inte köra detta kodparti samtidigt som kodpartiet för figurerna ovan,
% utan kör dem ett i taget

% figure;
% for n =1:N
%     plot(r*cos(psi(n)), r*sin(psi(n)), '*');
%     axis([-1 1 -1 1]);
%     hold on;
%     plot(cos(phi(n)), sin(phi(n)), '*');
%     drawnow();
% end