<?php


namespace AppBundle\Controller;

use AppBundle\Entity\Bourse;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\JsonResponse;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\VarDumper\VarDumper;

class SendController extends Controller
{
    /**
     * @param Bourse $bourse
     * @Route("/send-notification")
     * @Method({"POST"})
     * @return JsonResponse
     */
    public function postAction(Request $request) {

        $content = json_decode($request->getContent());

        $message = \Swift_Message::newInstance()
            ->setSubject("Reponse de bourse")
            ->setFrom('emn.fil2018@gmail.com')
            ->setTo($content->beneficiaireEmail)
            ->setBody(sprintf('BRAVO POUR VOS BOURSES, votre montant affecté est de %s', $content->montantAffecte));

        $failedRecipient  = [];
        $response = $this->get('mailer')->send($message, $failedRecipient);

        return new JsonResponse([$failedRecipient, $response]);
    }
}
