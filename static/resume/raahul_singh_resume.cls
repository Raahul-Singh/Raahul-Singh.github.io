% Raahul Singh Resume Class
\ProvidesClass{raahul_singh_resume}[2023/04/09 CV class]
\NeedsTeXFormat{LaTeX2e}
\DeclareOption{print}{\def\@cv@print{}}
\DeclareOption*{%
  \PassOptionsToClass{\CurrentOption}{article}
}
\ProcessOptions\relax
\LoadClass{article}

% Package Imports
\usepackage[hmargin=1.25cm, vmargin=0.75cm]{geometry}
\usepackage[hidelinks]{hyperref}
\usepackage{cite}
\renewcommand\refname{\vskip -1.5cm}

% Colors
\usepackage[usenames,dvipsnames]{xcolor} 
\definecolor{date}{HTML}{666666} 
\definecolor{primary}{HTML}{2b2b2b} 
\definecolor{headings}{HTML}{6A6A6A}
\definecolor{subheadings}{HTML}{333333}

% Fonts
\usepackage{fontspec}
\usepackage{lato}
\usepackage{raleway}

% Date command
\usepackage[absolute]{textpos}
\usepackage[UKenglish]{isodate}
\setlength{\TPHorizModule}{1mm}
\setlength{\TPVertModule}{1mm}
\newcommand{\lastupdated}{\begin{textblock}{60}(155,5)
\color{date}\fontspec{Raleway}\fontsize{8pt}{10pt}\selectfont 
Last Updated on \today
\end{textblock}}

% Name command
\newcommand{\namesection}[3]{
\centering{
\fontsize{40pt}{60pt}
\fontspec{Lato}\selectfont #1 
\fontspec{Lato}\selectfont #2
} \\[5pt]
\centering{
\color{headings}
\fontspec{Raleway}\fontsize{11pt}{14pt}\selectfont #3}
\noindent\makebox[\linewidth]{\color{headings}\rule{\paperwidth}{0.4pt}}
\vspace{-15pt}
}

% Section formatting
\usepackage{titlesec}
\titlespacing{\section}{0pt}{0pt}{0pt} 
\titlespacing{\subsection}{0pt}{0pt}{0pt}
\newcommand{\sectionsep}{\vspace{8pt}}

% Headings
\titleformat{\section}{\color{headings}
\scshape\fontspec{Lato}\fontsize{16pt}{24pt}\selectfont \raggedright\uppercase}{}{0em}{}

% Subheadings
\titleformat{\subsection}{
\color{subheadings}\fontspec{Lato}\fontsize{12pt}{12pt}\selectfont\bfseries\uppercase}{}{0em}{}

\newcommand{\runsubsection}[1]{
\color{subheadings}\fontspec{Lato}\fontsize{12pt}{12pt}\selectfont\bfseries\uppercase {#1} \normalfont}

% Descriptors
\newcommand{\descript}[1]{
\color{subheadings}\raggedright\scshape\fontspec{Raleway}\fontsize{11pt}{13pt}\selectfont {#1 \\} \normalfont}

% Location
\newcommand{\location}[1]{
\color{headings}\raggedright\fontspec{Raleway}\fontsize{10pt}{12pt}\selectfont {#1\\} \normalfont}

% Bullet Lists
\newenvironment{tightemize}{
\vspace{-\topsep}\begin{itemize}\itemsep1pt \parskip0pt \parsep0pt}
{\end{itemize}\vspace{-\topsep}} 