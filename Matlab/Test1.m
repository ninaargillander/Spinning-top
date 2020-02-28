% Definiera alla konstanter
% Sätter igång snurran
F = 0.9;              % Kraften som appliceras
delta_t = 0.18;     % Tiden under vilken en kraft appliceras

% Snurrans egenskaper
mass = 0.123;       % Snurrans massa
r = 0.04;           % Snurrans radie (längst upp)
h = 4*com/3;           % Snurrans höjd
com = 0.04;        % Avståndet till masscentrum
g = -9.82;           % Gravitationskonstanten


% Trögehtsmoment
I1 = mass * ((3/20)*r*r + (3/80)*h*h);  % Tröghetsmoment vid lutning
I3 = (3*mass*r*r)/10; % Tröghetsmoment när rak (Vertikal om underlaget)

% Friktion
Fric_coeff = 0.006;  % Friktionskoefficient för ek mot ek
Friction = Fric_coeff * mass * g; % Frictionskraften, negativ normalkraft gånger friktionkoefficient

                  
% Beräkna psi_dot
psi_dot = F*r*delta_t/I3;

% psi_dot_dot(1) = -mass*g*com*sin(theta(1)) / I3;
% psi_dot(1) = F*r*delta_t/I3;
% psi_dot_limit = 4*I1*mass*g*cos(theta(1)) / (I3*I3);

% Beräkna phi_dot
phi_dot = -mass*g*com/(psi_dot*I1);

% phi_dot(1) = -mass*g*com/(psi_dot(1)*I1);

% Beräkna theta och theta_dot
theta_dot = Friction * com / (I3*psi_dot);
theta(1) = pi / 2; % theta = pi/2 ty står upprätt

% theta_dot(1) = Friction * com / (I3*psi_dot(1));


% % Beräkna rörelsemängdsmoment
% L(1) = I3 * psi_dot;
% 
% % Beräkna kraftmomentet
% T(1) = mass * g * com * sin(theta(1));

H=0.01; % step's size
N=5000; % number of steps

% Startvärden för psi och phi
psi(1) = 0;
phi(1) = 0;

% For-loop för att beräkna allt möjligt med hjälp av Euler (eller tidigare
% vinklar)
for n=1:N
    
    theta(n+1) = Euler(theta(n), theta_dot, H);
    
%     theta(n+1) = Euler(theta(n), theta_dot(n), H);
%     psi_dot_dot(n+1) = -mass*g*com*sin(theta(n+1)) / I3;
%     psi_dot(n+1) = Euler(psi_dot(n), psi_dot_dot(n), H);
%     phi_dot(n+1) = mass * g * com / (psi_dot(n+1)*I1);
%     theta_dot(n+1) = Friction * com / (I3*psi_dot(n+1));
    
%    T(n+1) = mass * g * com * sin(theta(n+1));
%    
%    L(n+1) = Euler(L(n), T(n), H);
%    
%    W3(n+1) = L(n+1) / I1;

%    W3(n) = psi_dot(n) + phi_dot(n)*cos(theta(n));

    W3(n) = psi_dot + phi_dot*cos(theta(n));

    % Denna gräns fungerar inte direkt
    W3_limit(n) = 4*I1*com*mass*g*cos(theta(n)) / (I3*I3);
    
    if W3(n) * W3(n) < W3_limit(n) || theta(n) < 0
       psi_dot = 0;
       phi_dot = 0;
       theta_dot = 0;
        
%        psi_dot(n) = 0;
%        phi_dot(n) = 0;
%        theta_dot(n) = 0;
    end
    
    psi(n+1) = Euler(psi(n), psi_dot, H);
    phi(n+1) = Euler(phi(n), phi_dot, H);
    
%     psi(n+1) = Euler(psi(n), psi_dot(n), H);
%     phi(n+1) = Euler(phi(n), phi_dot(n), H);
end

% Plotta resultaten från loopen ovan.
t = 0:H:H*N;
plot(t,mod(psi,2*pi),'r');
title('Psi');
figure;
plot(t,mod(phi,2*pi),'r');
title('Phi');
figure;
plot(t,theta,'r');
title('Theta');
% figure;
% plot(t,phi_dot,'r');
% figure;
% plot(t,theta_dot,'r');

% Märkte när jag körde denna nedan att mittensnurren ändrar riktning efter en
% stund och börjar gå åt andra hållet. Vet ej vad det beror på. Den andra
% rör sig jättesakta, känns inte heller så bra.
% 
% for n =1:N
%     plot(r*cos(psi(n)), r*sin(psi(n)), '*');
%     axis([-1 1 -1 1]);
%     hold on;
%     plot(cos(phi(n)), sin(phi(n)), '*');
%     drawnow();
% end